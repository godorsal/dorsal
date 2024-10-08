(function UMDish(name, context, definition, plugins) {
    context[name] = definition.call(context);
    for (var i = 0; i < plugins.length; i++) {
        plugins[i](context[name])
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = context[name];
    } else if (typeof define === "function" && define.amd) {
        define(function reference() { return context[name]; });
    }
})("Primus", this || {}, function wrapper() {
    var define, module, exports
    , Primus = (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
        'use strict';

        /**
        * Create a function that will cleanup the instance.
        *
        * @param {Array|String} keys Properties on the instance that needs to be cleared.
        * @param {Object} options Additional configuration.
        * @returns {Function} Destroy function
        * @api public
        */
        module.exports = function demolish(keys, options) {
            var split = /[, ]+/;

            options = options ||  {};
            keys = keys || [];

            if ('string' === typeof keys) keys = keys.split(split);

            /**
            * Run addition cleanup hooks.
            *
            * @param {String} key Name of the clean up hook to run.
            * @param {Mixed} selfie Reference to the instance we're cleaning up.
            * @api private
            */
            function run(key, selfie) {
                if (!options[key]) return;
                if ('string' === typeof options[key]) options[key] = options[key].split(split);
                if ('function' === typeof options[key]) return options[key].call(selfie);

                for (var i = 0, type, what; i < options[key].length; i++) {
                    what = options[key][i];
                    type = typeof what;

                    if ('function' === type) {
                        what.call(selfie);
                    } else if ('string' === type && 'function' === typeof selfie[what]) {
                        selfie[what]();
                    }
                }
            }

            /**
            * Destroy the instance completely and clean up all the existing references.
            *
            * @returns {Boolean}
            * @api public
            */
            return function destroy() {
                var selfie = this
                , i = 0
                , prop;

                if (selfie[keys[0]] === null) return false;
                run('before', selfie);

                for (; i < keys.length; i++) {
                    prop = keys[i];

                    if (selfie[prop]) {
                        if ('function' === typeof selfie[prop].destroy) selfie[prop].destroy();
                        selfie[prop] = null;
                    }
                }

                if (selfie.emit) selfie.emit('destroy');
                run('after', selfie);

                return true;
            };
        };

    },{}],2:[function(_dereq_,module,exports){
        'use strict';

        /**
        * Returns a function that when invoked executes all the listeners of the
        * given event with the given arguments.
        *
        * @returns {Function} The function that emits all the things.
        * @api public
        */
        module.exports = function emits() {
            var self = this
            , parser;

            for (var i = 0, l = arguments.length, args = new Array(l); i < l; i++) {
                args[i] = arguments[i];
            }

            //
            // If the last argument is a function, assume that it's a parser.
            //
            if ('function' !== typeof args[args.length - 1]) return function emitter() {
                for (var i = 0, l = arguments.length, arg = new Array(l); i < l; i++) {
                    arg[i] = arguments[i];
                }

                return self.emit.apply(self, args.concat(arg));
            };

            parser = args.pop();

            /**
            * The actual function that emits the given event. It returns a boolean
            * indicating if the event was emitted.
            *
            * @returns {Boolean}
            * @api public
            */
            return function emitter() {
                for (var i = 0, l = arguments.length, arg = new Array(l + 1); i < l; i++) {
                    arg[i + 1] = arguments[i];
                }

                /**
                * Async completion method for the parser.
                *
                * @param {Error} err Optional error when parsing failed.
                * @param {Mixed} returned Emit instructions.
                * @api private
                */
                arg[0] = function next(err, returned) {
                    if (err) return self.emit('error', err);

                    arg = returned === undefined
                    ? arg.slice(1) : returned === null
                    ? [] : returned;

                    self.emit.apply(self, args.concat(arg));
                };

                parser.apply(self, arg);
                return true;
            };
        };

    },{}],3:[function(_dereq_,module,exports){
        'use strict';

        var has = Object.prototype.hasOwnProperty;

        //
        // We store our EE objects in a plain object whose properties are event names.
        // If `Object.create(null)` is not supported we prefix the event names with a
        // `~` to make sure that the built-in object properties are not overridden or
        // used as an attack vector.
        // We also assume that `Object.create(null)` is available when the event name
        // is an ES6 Symbol.
        //
        var prefix = typeof Object.create !== 'function' ? '~' : false;

        /**
        * Representation of a single EventEmitter function.
        *
        * @param {Function} fn Event handler to be called.
        * @param {Mixed} context Context for function execution.
        * @param {Boolean} [once=false] Only emit once
        * @api private
        */
        function EE(fn, context, once) {
            this.fn = fn;
            this.context = context;
            this.once = once || false;
        }

        /**
        * Minimal EventEmitter interface that is molded against the Node.js
        * EventEmitter interface.
        *
        * @constructor
        * @api public
        */
        function EventEmitter() { /* Nothing to set */ }

        /**
        * Hold the assigned EventEmitters by name.
        *
        * @type {Object}
        * @private
        */
        EventEmitter.prototype._events = undefined;

        /**
        * Return an array listing the events for which the emitter has registered
        * listeners.
        *
        * @returns {Array}
        * @api public
        */
        EventEmitter.prototype.eventNames = function eventNames() {
            var events = this._events
            , names = []
            , name;

            if (!events) return names;

            for (name in events) {
                if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
            }

            if (Object.getOwnPropertySymbols) {
                return names.concat(Object.getOwnPropertySymbols(events));
            }

            return names;
        };

        /**
        * Return a list of assigned event listeners.
        *
        * @param {String} event The events that should be listed.
        * @param {Boolean} exists We only need to know if there are listeners.
        * @returns {Array|Boolean}
        * @api public
        */
        EventEmitter.prototype.listeners = function listeners(event, exists) {
            var evt = prefix ? prefix + event : event
            , available = this._events && this._events[evt];

            if (exists) return !!available;
            if (!available) return [];
            if (available.fn) return [available.fn];

            for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
                ee[i] = available[i].fn;
            }

            return ee;
        };

        /**
        * Emit an event to all registered event listeners.
        *
        * @param {String} event The name of the event.
        * @returns {Boolean} Indication if we've emitted an event.
        * @api public
        */
        EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
            var evt = prefix ? prefix + event : event;

            if (!this._events || !this._events[evt]) return false;

            var listeners = this._events[evt]
            , len = arguments.length
            , args
            , i;

            if ('function' === typeof listeners.fn) {
                if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

                switch (len) {
                    case 1: return listeners.fn.call(listeners.context), true;
                    case 2: return listeners.fn.call(listeners.context, a1), true;
                    case 3: return listeners.fn.call(listeners.context, a1, a2), true;
                    case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
                    case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
                    case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
                }

                for (i = 1, args = new Array(len -1); i < len; i++) {
                    args[i - 1] = arguments[i];
                }

                listeners.fn.apply(listeners.context, args);
            } else {
                var length = listeners.length
                , j;

                for (i = 0; i < length; i++) {
                    if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

                    switch (len) {
                        case 1: listeners[i].fn.call(listeners[i].context); break;
                        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
                        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
                        default:
                        if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
                            args[j - 1] = arguments[j];
                        }

                        listeners[i].fn.apply(listeners[i].context, args);
                    }
                }
            }

            return true;
        };

        /**
        * Register a new EventListener for the given event.
        *
        * @param {String} event Name of the event.
        * @param {Function} fn Callback function.
        * @param {Mixed} [context=this] The context of the function.
        * @api public
        */
        EventEmitter.prototype.on = function on(event, fn, context) {
            var listener = new EE(fn, context || this)
            , evt = prefix ? prefix + event : event;

            if (!this._events) this._events = prefix ? {} : Object.create(null);
            if (!this._events[evt]) this._events[evt] = listener;
            else {
                if (!this._events[evt].fn) this._events[evt].push(listener);
                else this._events[evt] = [
                    this._events[evt], listener
                ];
            }

            return this;
        };

        /**
        * Add an EventListener that's only called once.
        *
        * @param {String} event Name of the event.
        * @param {Function} fn Callback function.
        * @param {Mixed} [context=this] The context of the function.
        * @api public
        */
        EventEmitter.prototype.once = function once(event, fn, context) {
            var listener = new EE(fn, context || this, true)
            , evt = prefix ? prefix + event : event;

            if (!this._events) this._events = prefix ? {} : Object.create(null);
            if (!this._events[evt]) this._events[evt] = listener;
            else {
                if (!this._events[evt].fn) this._events[evt].push(listener);
                else this._events[evt] = [
                    this._events[evt], listener
                ];
            }

            return this;
        };

        /**
        * Remove event listeners.
        *
        * @param {String} event The event we want to remove.
        * @param {Function} fn The listener that we need to find.
        * @param {Mixed} context Only remove listeners matching this context.
        * @param {Boolean} once Only remove once listeners.
        * @api public
        */
        EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
            var evt = prefix ? prefix + event : event;

            if (!this._events || !this._events[evt]) return this;

            var listeners = this._events[evt]
            , events = [];

            if (fn) {
                if (listeners.fn) {
                    if (
                        listeners.fn !== fn
                        || (once && !listeners.once)
                        || (context && listeners.context !== context)
                    ) {
                        events.push(listeners);
                    }
                } else {
                    for (var i = 0, length = listeners.length; i < length; i++) {
                        if (
                            listeners[i].fn !== fn
                            || (once && !listeners[i].once)
                            || (context && listeners[i].context !== context)
                        ) {
                            events.push(listeners[i]);
                        }
                    }
                }
            }

            //
            // Reset the array, or remove it completely if we have no more listeners.
            //
            if (events.length) {
                this._events[evt] = events.length === 1 ? events[0] : events;
            } else {
                delete this._events[evt];
            }

            return this;
        };

        /**
        * Remove all listeners or only the listeners for the specified event.
        *
        * @param {String} event The event want to remove all listeners for.
        * @api public
        */
        EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
            if (!this._events) return this;

            if (event) delete this._events[prefix ? prefix + event : event];
            else this._events = prefix ? {} : Object.create(null);

            return this;
        };

        //
        // Alias methods names because people roll like that.
        //
        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
        EventEmitter.prototype.addListener = EventEmitter.prototype.on;

        //
        // This function doesn't apply anymore.
        //
        EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
            return this;
        };

        //
        // Expose the prefix.
        //
        EventEmitter.prefixed = prefix;

        //
        // Expose the module.
        //
        if ('undefined' !== typeof module) {
            module.exports = EventEmitter;
        }

    },{}],4:[function(_dereq_,module,exports){
        'use strict';

        var regex = new RegExp('^((?:\\d+)?\\.?\\d+) *('+ [
            'milliseconds?',
            'msecs?',
            'ms',
            'seconds?',
            'secs?',
            's',
            'minutes?',
            'mins?',
            'm',
            'hours?',
            'hrs?',
            'h',
            'days?',
            'd',
            'weeks?',
            'wks?',
            'w',
            'years?',
            'yrs?',
            'y'
        ].join('|') +')?$', 'i');

        var second = 1000
        , minute = second * 60
        , hour = minute * 60
        , day = hour * 24
        , week = day * 7
        , year = day * 365;

        /**
        * Parse a time string and return the number value of it.
        *
        * @param {String} ms Time string.
        * @returns {Number}
        * @api private
        */
        module.exports = function millisecond(ms) {
            var type = typeof ms
            , amount
            , match;

            if ('number' === type) return ms;
            else if ('string' !== type || '0' === ms || !ms) return 0;
            else if (+ms) return +ms;

            //
            // We are vulnerable to the regular expression denial of service (ReDoS).
            // In order to mitigate this we don't parse the input string if it is too long.
            // See https://nodesecurity.io/advisories/46.
            //
            if (ms.length > 10000 || !(match = regex.exec(ms))) return 0;

            amount = parseFloat(match[1]);

            switch (match[2].toLowerCase()) {
                case 'years':
                case 'year':
                case 'yrs':
                case 'yr':
                case 'y':
                return amount * year;

                case 'weeks':
                case 'week':
                case 'wks':
                case 'wk':
                case 'w':
                return amount * week;

                case 'days':
                case 'day':
                case 'd':
                return amount * day;

                case 'hours':
                case 'hour':
                case 'hrs':
                case 'hr':
                case 'h':
                return amount * hour;

                case 'minutes':
                case 'minute':
                case 'mins':
                case 'min':
                case 'm':
                return amount * minute;

                case 'seconds':
                case 'second':
                case 'secs':
                case 'sec':
                case 's':
                return amount * second;

                default:
                return amount;
            }
        };

    },{}],5:[function(_dereq_,module,exports){
        'use strict';

        /**
        * Wrap callbacks to prevent double execution.
        *
        * @param {Function} fn Function that should only be called once.
        * @returns {Function} A wrapped callback which prevents execution.
        * @api public
        */
        module.exports = function one(fn) {
            var called = 0
            , value;

            /**
            * The function that prevents double execution.
            *
            * @api private
            */
            function onetime() {
                if (called) return value;

                called = 1;
                value = fn.apply(this, arguments);
                fn = null;

                return value;
            }

            //
            // To make debugging more easy we want to use the name of the supplied
            // function. So when you look at the functions that are assigned to event
            // listeners you don't see a load of `onetime` functions but actually the
            // names of the functions that this module will call.
            //
            onetime.displayName = fn.displayName || fn.name || onetime.displayName || onetime.name;
            return onetime;
        };

    },{}],6:[function(_dereq_,module,exports){
        'use strict';

        var has = Object.prototype.hasOwnProperty;

        /**
        * Simple query string parser.
        *
        * @param {String} query The query string that needs to be parsed.
        * @returns {Object}
        * @api public
        */
        function querystring(query) {
            var parser = /([^=?&]+)=([^&]*)/g
            , result = {}
            , part;

            //
            // Little nifty parsing hack, leverage the fact that RegExp.exec increments
            // the lastIndex property so we can continue executing this loop until we've
            // parsed all results.
            //
            for (;
                part = parser.exec(query);
                result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
            );

            return result;
        }

        /**
        * Transform a query string to an object.
        *
        * @param {Object} obj Object that should be transformed.
        * @param {String} prefix Optional prefix.
        * @returns {String}
        * @api public
        */
        function querystringify(obj, prefix) {
            prefix = prefix || '';

            var pairs = [];

            //
            // Optionally prefix with a '?' if needed
            //
            if ('string' !== typeof prefix) prefix = '?';

            for (var key in obj) {
                if (has.call(obj, key)) {
                    pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
                }
            }

            return pairs.length ? prefix + pairs.join('&') : '';
        }

        //
        // Expose the module.
        //
        exports.stringify = querystringify;
        exports.parse = querystring;

    },{}],7:[function(_dereq_,module,exports){
        'use strict';

        var EventEmitter = _dereq_('eventemitter3')
        , millisecond = _dereq_('millisecond')
        , destroy = _dereq_('demolish')
        , Tick = _dereq_('tick-tock')
        , one = _dereq_('one-time');

        /**
        * Returns sane defaults about a given value.
        *
        * @param {String} name Name of property we want.
        * @param {Recovery} selfie Recovery instance that got created.
        * @param {Object} opts User supplied options we want to check.
        * @returns {Number} Some default value.
        * @api private
        */
        function defaults(name, selfie, opts) {
            return millisecond(
                name in opts ? opts[name] : (name in selfie ? selfie[name] : Recovery[name])
            );
        }

        /**
        * Attempt to recover your connection with reconnection attempt.
        *
        * @constructor
        * @param {Object} options Configuration
        * @api public
        */
        function Recovery(options) {
            var recovery = this;

            if (!(recovery instanceof Recovery)) return new Recovery(options);

            options = options || {};

            recovery.attempt = null;        // Stores the current reconnect attempt.
            recovery._fn = null;            // Stores the callback.

            recovery['reconnect timeout'] = defaults('reconnect timeout', recovery, options);
            recovery.retries = defaults('retries', recovery, options);
            recovery.factor = defaults('factor', recovery, options);
            recovery.max = defaults('max', recovery, options);
            recovery.min = defaults('min', recovery, options);
            recovery.timers = new Tick(recovery);
        }

        Recovery.prototype = new EventEmitter();
        Recovery.prototype.constructor = Recovery;

        Recovery['reconnect timeout'] = '30 seconds';  // Maximum time to wait for an answer.
        Recovery.max = Infinity;                       // Maximum delay.
        Recovery.min = '500 ms';                       // Minimum delay.
        Recovery.retries = 10;                         // Maximum amount of retries.
        Recovery.factor = 2;                           // Exponential back off factor.

        /**
        * Start a new reconnect procedure.
        *
        * @returns {Recovery}
        * @api public
        */
        Recovery.prototype.reconnect = function reconnect() {
            var recovery = this;

            return recovery.backoff(function backedoff(err, opts) {
                opts.duration = (+new Date()) - opts.start;

                if (err) return recovery.emit('reconnect failed', err, opts);

                recovery.emit('reconnected', opts);
            }, recovery.attempt);
        };

        /**
        * Exponential back off algorithm for retry operations. It uses a randomized
        * retry so we don't DDOS our server when it goes down under pressure.
        *
        * @param {Function} fn Callback to be called after the timeout.
        * @param {Object} opts Options for configuring the timeout.
        * @returns {Recovery}
        * @api private
        */
        Recovery.prototype.backoff = function backoff(fn, opts) {
            var recovery = this;

            opts = opts || recovery.attempt || {};

            //
            // Bailout when we already have a back off process running. We shouldn't call
            // the callback then.
            //
            if (opts.backoff) return recovery;

            opts['reconnect timeout'] = defaults('reconnect timeout', recovery, opts);
            opts.retries = defaults('retries', recovery, opts);
            opts.factor = defaults('factor', recovery, opts);
            opts.max = defaults('max', recovery, opts);
            opts.min = defaults('min', recovery, opts);

            opts.start = +opts.start || +new Date();
            opts.duration = +opts.duration || 0;
            opts.attempt = +opts.attempt || 0;

            //
            // Bailout if we are about to make too much attempts.
            //
            if (opts.attempt === opts.retries) {
                fn.call(recovery, new Error('Unable to recover'), opts);
                return recovery;
            }

            //
            // Prevent duplicate back off attempts using the same options object and
            // increment our attempt as we're about to have another go at this thing.
            //
            opts.backoff = true;
            opts.attempt++;

            recovery.attempt = opts;

            //
            // Calculate the timeout, but make it randomly so we don't retry connections
            // at the same interval and defeat the purpose. This exponential back off is
            // based on the work of:
            //
            // http://dthain.blogspot.nl/2009/02/exponential-backoff-in-distributed.html
            //
            opts.scheduled = opts.attempt !== 1
            ? Math.min(Math.round(
                (Math.random() + 1) * opts.min * Math.pow(opts.factor, opts.attempt - 1)
            ), opts.max)
            : opts.min;

            recovery.timers.setTimeout('reconnect', function delay() {
                opts.duration = (+new Date()) - opts.start;
                opts.backoff = false;
                recovery.timers.clear('reconnect, timeout');

                //
                // Create a `one` function which can only be called once. So we can use the
                // same function for different types of invocations to create a much better
                // and usable API.
                //
                var connect = recovery._fn = one(function connect(err) {
                    recovery.reset();

                    if (err) return recovery.backoff(fn, opts);

                    fn.call(recovery, undefined, opts);
                });

                recovery.emit('reconnect', opts, connect);
                recovery.timers.setTimeout('timeout', function timeout() {
                    var err = new Error('Failed to reconnect in a timely manner');
                    opts.duration = (+new Date()) - opts.start;

                    recovery.emit('reconnect timeout', err, opts);
                    connect(err);
                }, opts['reconnect timeout']);
            }, opts.scheduled);

            //
            // Emit a `reconnecting` event with current reconnect options. This allows
            // them to update the UI and provide their users with feedback.
            //
            recovery.emit('reconnect scheduled', opts);

            return recovery;
        };

        /**
        * Check if the reconnection process is currently reconnecting.
        *
        * @returns {Boolean}
        * @api public
        */
        Recovery.prototype.reconnecting = function reconnecting() {
            return !!this.attempt;
        };

        /**
        * Tell our reconnection procedure that we're passed.
        *
        * @param {Error} err Reconnection failed.
        * @returns {Recovery}
        * @api public
        */
        Recovery.prototype.reconnected = function reconnected(err) {
            if (this._fn) this._fn(err);
            return this;
        };

        /**
        * Reset the reconnection attempt so it can be re-used again.
        *
        * @returns {Recovery}
        * @api public
        */
        Recovery.prototype.reset = function reset() {
            this._fn = this.attempt = null;
            this.timers.clear('reconnect, timeout');

            return this;
        };

        /**
        * Clean up the instance.
        *
        * @type {Function}
        * @returns {Boolean}
        * @api public
        */
        Recovery.prototype.destroy = destroy('timers attempt _fn');

        //
        // Expose the module.
        //
        module.exports = Recovery;

    },{"demolish":1,"eventemitter3":8,"millisecond":4,"one-time":5,"tick-tock":10}],8:[function(_dereq_,module,exports){
        'use strict';

        //
        // We store our EE objects in a plain object whose properties are event names.
        // If `Object.create(null)` is not supported we prefix the event names with a
        // `~` to make sure that the built-in object properties are not overridden or
        // used as an attack vector.
        // We also assume that `Object.create(null)` is available when the event name
        // is an ES6 Symbol.
        //
        var prefix = typeof Object.create !== 'function' ? '~' : false;

        /**
        * Representation of a single EventEmitter function.
        *
        * @param {Function} fn Event handler to be called.
        * @param {Mixed} context Context for function execution.
        * @param {Boolean} once Only emit once
        * @api private
        */
        function EE(fn, context, once) {
            this.fn = fn;
            this.context = context;
            this.once = once || false;
        }

        /**
        * Minimal EventEmitter interface that is molded against the Node.js
        * EventEmitter interface.
        *
        * @constructor
        * @api public
        */
        function EventEmitter() { /* Nothing to set */ }

        /**
        * Holds the assigned EventEmitters by name.
        *
        * @type {Object}
        * @private
        */
        EventEmitter.prototype._events = undefined;

        /**
        * Return a list of assigned event listeners.
        *
        * @param {String} event The events that should be listed.
        * @param {Boolean} exists We only need to know if there are listeners.
        * @returns {Array|Boolean}
        * @api public
        */
        EventEmitter.prototype.listeners = function listeners(event, exists) {
            var evt = prefix ? prefix + event : event
            , available = this._events && this._events[evt];

            if (exists) return !!available;
            if (!available) return [];
            if (available.fn) return [available.fn];

            for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
                ee[i] = available[i].fn;
            }

            return ee;
        };

        /**
        * Emit an event to all registered event listeners.
        *
        * @param {String} event The name of the event.
        * @returns {Boolean} Indication if we've emitted an event.
        * @api public
        */
        EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
            var evt = prefix ? prefix + event : event;

            if (!this._events || !this._events[evt]) return false;

            var listeners = this._events[evt]
            , len = arguments.length
            , args
            , i;

            if ('function' === typeof listeners.fn) {
                if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

                switch (len) {
                    case 1: return listeners.fn.call(listeners.context), true;
                    case 2: return listeners.fn.call(listeners.context, a1), true;
                    case 3: return listeners.fn.call(listeners.context, a1, a2), true;
                    case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
                    case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
                    case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
                }

                for (i = 1, args = new Array(len -1); i < len; i++) {
                    args[i - 1] = arguments[i];
                }

                listeners.fn.apply(listeners.context, args);
            } else {
                var length = listeners.length
                , j;

                for (i = 0; i < length; i++) {
                    if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

                    switch (len) {
                        case 1: listeners[i].fn.call(listeners[i].context); break;
                        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
                        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
                        default:
                        if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
                            args[j - 1] = arguments[j];
                        }

                        listeners[i].fn.apply(listeners[i].context, args);
                    }
                }
            }

            return true;
        };

        /**
        * Register a new EventListener for the given event.
        *
        * @param {String} event Name of the event.
        * @param {Functon} fn Callback function.
        * @param {Mixed} context The context of the function.
        * @api public
        */
        EventEmitter.prototype.on = function on(event, fn, context) {
            var listener = new EE(fn, context || this)
            , evt = prefix ? prefix + event : event;

            if (!this._events) this._events = prefix ? {} : Object.create(null);
            if (!this._events[evt]) this._events[evt] = listener;
            else {
                if (!this._events[evt].fn) this._events[evt].push(listener);
                else this._events[evt] = [
                    this._events[evt], listener
                ];
            }

            return this;
        };

        /**
        * Add an EventListener that's only called once.
        *
        * @param {String} event Name of the event.
        * @param {Function} fn Callback function.
        * @param {Mixed} context The context of the function.
        * @api public
        */
        EventEmitter.prototype.once = function once(event, fn, context) {
            var listener = new EE(fn, context || this, true)
            , evt = prefix ? prefix + event : event;

            if (!this._events) this._events = prefix ? {} : Object.create(null);
            if (!this._events[evt]) this._events[evt] = listener;
            else {
                if (!this._events[evt].fn) this._events[evt].push(listener);
                else this._events[evt] = [
                    this._events[evt], listener
                ];
            }

            return this;
        };

        /**
        * Remove event listeners.
        *
        * @param {String} event The event we want to remove.
        * @param {Function} fn The listener that we need to find.
        * @param {Mixed} context Only remove listeners matching this context.
        * @param {Boolean} once Only remove once listeners.
        * @api public
        */
        EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
            var evt = prefix ? prefix + event : event;

            if (!this._events || !this._events[evt]) return this;

            var listeners = this._events[evt]
            , events = [];

            if (fn) {
                if (listeners.fn) {
                    if (
                        listeners.fn !== fn
                        || (once && !listeners.once)
                        || (context && listeners.context !== context)
                    ) {
                        events.push(listeners);
                    }
                } else {
                    for (var i = 0, length = listeners.length; i < length; i++) {
                        if (
                            listeners[i].fn !== fn
                            || (once && !listeners[i].once)
                            || (context && listeners[i].context !== context)
                        ) {
                            events.push(listeners[i]);
                        }
                    }
                }
            }

            //
            // Reset the array, or remove it completely if we have no more listeners.
            //
            if (events.length) {
                this._events[evt] = events.length === 1 ? events[0] : events;
            } else {
                delete this._events[evt];
            }

            return this;
        };

        /**
        * Remove all listeners or only the listeners for the specified event.
        *
        * @param {String} event The event want to remove all listeners for.
        * @api public
        */
        EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
            if (!this._events) return this;

            if (event) delete this._events[prefix ? prefix + event : event];
            else this._events = prefix ? {} : Object.create(null);

            return this;
        };

        //
        // Alias methods names because people roll like that.
        //
        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
        EventEmitter.prototype.addListener = EventEmitter.prototype.on;

        //
        // This function doesn't apply anymore.
        //
        EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
            return this;
        };

        //
        // Expose the prefix.
        //
        EventEmitter.prefixed = prefix;

        //
        // Expose the module.
        //
        if ('undefined' !== typeof module) {
            module.exports = EventEmitter;
        }

    },{}],9:[function(_dereq_,module,exports){
        'use strict';

        /**
        * Check if we're required to add a port number.
        *
        * @see https://url.spec.whatwg.org/#default-port
        * @param {Number|String} port Port number we need to check
        * @param {String} protocol Protocol we need to check against.
        * @returns {Boolean} Is it a default port for the given protocol
        * @api private
        */
        module.exports = function required(port, protocol) {
            protocol = protocol.split(':')[0];
            port = +port;

            if (!port) return false;

            switch (protocol) {
                case 'http':
                case 'ws':
                return port !== 80;

                case 'https':
                case 'wss':
                return port !== 443;

                case 'ftp':
                return port !== 21;

                case 'gopher':
                return port !== 70;

                case 'file':
                return false;
            }

            return port !== 0;
        };

    },{}],10:[function(_dereq_,module,exports){
        'use strict';

        var has = Object.prototype.hasOwnProperty
        , ms = _dereq_('millisecond');

        /**
        * Timer instance.
        *
        * @constructor
        * @param {Object} timer New timer instance.
        * @param {Function} clear Clears the timer instance.
        * @param {Function} duration Duration of the timer.
        * @param {Function} fn The functions that need to be executed.
        * @api private
        */
        function Timer(timer, clear, duration, fn) {
            this.start = +(new Date());
            this.duration = duration;
            this.clear = clear;
            this.timer = timer;
            this.fns = [fn];
        }

        /**
        * Calculate the time left for a given timer.
        *
        * @returns {Number} Time in milliseconds.
        * @api public
        */
        Timer.prototype.remaining = function remaining() {
            return this.duration - this.taken();
        };

        /**
        * Calculate the amount of time it has taken since we've set the timer.
        *
        * @returns {Number}
        * @api public
        */
        Timer.prototype.taken = function taken() {
            return +(new Date()) - this.start;
        };

        /**
        * Custom wrappers for the various of clear{whatever} functions. We cannot
        * invoke them directly as this will cause thrown errors in Google Chrome with
        * an Illegal Invocation Error
        *
        * @see #2
        * @type {Function}
        * @api private
        */
        function unsetTimeout(id) { clearTimeout(id); }
        function unsetInterval(id) { clearInterval(id); }
        function unsetImmediate(id) { clearImmediate(id); }

        /**
        * Simple timer management.
        *
        * @constructor
        * @param {Mixed} context Context of the callbacks that we execute.
        * @api public
        */
        function Tick(context) {
            if (!(this instanceof Tick)) return new Tick(context);

            this.timers = {};
            this.context = context || this;
        }

        /**
        * Return a function which will just iterate over all assigned callbacks and
        * optionally clear the timers from memory if needed.
        *
        * @param {String} name Name of the timer we need to execute.
        * @param {Boolean} clear Also clear from memory.
        * @returns {Function}
        * @api private
        */
        Tick.prototype.tock = function ticktock(name, clear) {
            var tock = this;

            return function tickedtock() {
                if (!(name in tock.timers)) return;

                var timer = tock.timers[name]
                , fns = timer.fns.slice()
                , l = fns.length
                , i = 0;

                if (clear) tock.clear(name);
                else tock.start = +new Date();

                for (; i < l; i++) {
                    fns[i].call(tock.context);
                }
            };
        };

        /**
        * Add a new timeout.
        *
        * @param {String} name Name of the timer.
        * @param {Function} fn Completion callback.
        * @param {Mixed} time Duration of the timer.
        * @returns {Tick}
        * @api public
        */
        Tick.prototype.setTimeout = function timeout(name, fn, time) {
            var tick = this
            , tock;

            if (tick.timers[name]) {
                tick.timers[name].fns.push(fn);
                return tick;
            }

            tock = ms(time);
            tick.timers[name] = new Timer(
                setTimeout(tick.tock(name, true), ms(time)),
                unsetTimeout,
                tock,
                fn
            );

            return tick;
        };

        /**
        * Add a new interval.
        *
        * @param {String} name Name of the timer.
        * @param {Function} fn Completion callback.
        * @param {Mixed} time Interval of the timer.
        * @returns {Tick}
        * @api public
        */
        Tick.prototype.setInterval = function interval(name, fn, time) {
            var tick = this
            , tock;

            if (tick.timers[name]) {
                tick.timers[name].fns.push(fn);
                return tick;
            }

            tock = ms(time);
            tick.timers[name] = new Timer(
                setInterval(tick.tock(name), ms(time)),
                unsetInterval,
                tock,
                fn
            );

            return tick;
        };

        /**
        * Add a new setImmediate.
        *
        * @param {String} name Name of the timer.
        * @param {Function} fn Completion callback.
        * @returns {Tick}
        * @api public
        */
        Tick.prototype.setImmediate = function immediate(name, fn) {
            var tick = this;

            if ('function' !== typeof setImmediate) return tick.setTimeout(name, fn, 0);

            if (tick.timers[name]) {
                tick.timers[name].fns.push(fn);
                return tick;
            }

            tick.timers[name] = new Timer(
                setImmediate(tick.tock(name, true)),
                unsetImmediate,
                0,
                fn
            );

            return tick;
        };

        /**
        * Check if we have a timer set.
        *
        * @param {String} name
        * @returns {Boolean}
        * @api public
        */
        Tick.prototype.active = function active(name) {
            return name in this.timers;
        };

        /**
        * Properly clean up all timeout references. If no arguments are supplied we
        * will attempt to clear every single timer that is present.
        *
        * @param {Arguments} ..args.. The names of the timeouts we need to clear
        * @returns {Tick}
        * @api public
        */
        Tick.prototype.clear = function clear() {
            var args = arguments.length ? arguments : []
            , tick = this
            , timer, i, l;

            if (args.length === 1 && 'string' === typeof args[0]) {
                args = args[0].split(/[, ]+/);
            }

            if (!args.length) {
                for (timer in tick.timers) {
                    if (has.call(tick.timers, timer)) args.push(timer);
                }
            }

            for (i = 0, l = args.length; i < l; i++) {
                timer = tick.timers[args[i]];

                if (!timer) continue;
                timer.clear(timer.timer);

                timer.fns = timer.timer = timer.clear = null;
                delete tick.timers[args[i]];
            }

            return tick;
        };

        /**
        * Adjust a timeout or interval to a new duration.
        *
        * @returns {Tick}
        * @api public
        */
        Tick.prototype.adjust = function adjust(name, time) {
            var interval
            , tick = this
            , tock = ms(time)
            , timer = tick.timers[name];

            if (!timer) return tick;

            interval = timer.clear === unsetInterval;
            timer.clear(timer.timer);
            timer.start = +(new Date());
            timer.duration = tock;
            timer.timer = (interval ? setInterval : setTimeout)(tick.tock(name, !interval), tock);

            return tick;
        };

        /**
        * We will no longer use this module, prepare your self for global cleanups.
        *
        * @returns {Boolean}
        * @api public
        */
        Tick.prototype.end = Tick.prototype.destroy = function end() {
            if (!this.context) return false;

            this.clear();
            this.context = this.timers = null;

            return true;
        };

        //
        // Expose the timer factory.
        //
        Tick.Timer = Timer;
        module.exports = Tick;

    },{"millisecond":4}],11:[function(_dereq_,module,exports){
        'use strict';

        var required = _dereq_('requires-port')
        , lolcation = _dereq_('./lolcation')
        , qs = _dereq_('querystringify')
        , relativere = /^\/(?!\/)/
        , protocolre = /^([a-z0-9.+-]+:)?(\/\/)?(.*)$/i; // actual protocol is first match

        /**
        * These are the parse instructions for the URL parsers, it informs the parser
        * about:
        *
        * 0. The char it Needs to parse, if it's a string it should be done using
        *    indexOf, RegExp using exec and NaN means set as current value.
        * 1. The property we should set when parsing this value.
        * 2. Indication if it's backwards or forward parsing, when set as number it's
        *    the value of extra chars that should be split off.
        * 3. Inherit from location if non existing in the parser.
        * 4. `toLowerCase` the resulting value.
        */
        var instructions = [
            ['#', 'hash'],                        // Extract from the back.
            ['?', 'query'],                       // Extract from the back.
            ['/', 'pathname'],                    // Extract from the back.
            ['@', 'auth', 1],                     // Extract from the front.
            [NaN, 'host', undefined, 1, 1],       // Set left over value.
            [/\:(\d+)$/, 'port'],                 // RegExp the back.
            [NaN, 'hostname', undefined, 1, 1]    // Set left over.
        ];

        /**
        * @typedef ProtocolExtract
        * @type Object
        * @property {String} protocol Protocol matched in the URL, in lowercase
        * @property {Boolean} slashes Indicates whether the protocol is followed by double slash ("//")
        * @property {String} rest     Rest of the URL that is not part of the protocol
        */

        /**
        * Extract protocol information from a URL with/without double slash ("//")
        *
        * @param  {String} address   URL we want to extract from.
        * @return {ProtocolExtract}  Extracted information
        * @private
        */
        function extractProtocol(address) {
            var match = protocolre.exec(address);
            return {
                protocol: match[1] ? match[1].toLowerCase() : '',
                slashes: !!match[2],
                rest: match[3] ? match[3] : ''
            };
        }

        /**
        * The actual URL instance. Instead of returning an object we've opted-in to
        * create an actual constructor as it's much more memory efficient and
        * faster and it pleases my CDO.
        *
        * @constructor
        * @param {String} address URL we want to parse.
        * @param {Object|String} location Location defaults for relative paths.
        * @param {Boolean|Function} parser Parser for the query string.
        * @api public
        */
        function URL(address, location, parser) {
            if (!(this instanceof URL)) {
                return new URL(address, location, parser);
            }

            var relative = relativere.test(address)
            , parse, instruction, index, key
            , type = typeof location
            , url = this
            , i = 0;

            //
            // The following if statements allows this module two have compatibility with
            // 2 different API:
            //
            // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
            //    where the boolean indicates that the query string should also be parsed.
            //
            // 2. The `URL` interface of the browser which accepts a URL, object as
            //    arguments. The supplied object will be used as default values / fall-back
            //    for relative paths.
            //
            if ('object' !== type && 'string' !== type) {
                parser = location;
                location = null;
            }

            if (parser && 'function' !== typeof parser) {
                parser = qs.parse;
            }

            location = lolcation(location);

            // extract protocol information before running the instructions
            var extracted = extractProtocol(address);
            url.protocol = extracted.protocol || location.protocol || '';
            url.slashes = extracted.slashes || location.slashes;
            address = extracted.rest;

            for (; i < instructions.length; i++) {
                instruction = instructions[i];
                parse = instruction[0];
                key = instruction[1];

                if (parse !== parse) {
                    url[key] = address;
                } else if ('string' === typeof parse) {
                    if (~(index = address.indexOf(parse))) {
                        if ('number' === typeof instruction[2]) {
                            url[key] = address.slice(0, index);
                            address = address.slice(index + instruction[2]);
                        } else {
                            url[key] = address.slice(index);
                            address = address.slice(0, index);
                        }
                    }
                } else if (index = parse.exec(address)) {
                    url[key] = index[1];
                    address = address.slice(0, address.length - index[0].length);
                }

                url[key] = url[key] || (instruction[3] || ('port' === key && relative) ? location[key] || '' : '');

                //
                // Hostname, host and protocol should be lowercased so they can be used to
                // create a proper `origin`.
                //
                if (instruction[4]) {
                    url[key] = url[key].toLowerCase();
                }
            }

            //
            // Also parse the supplied query string in to an object. If we're supplied
            // with a custom parser as function use that instead of the default build-in
            // parser.
            //
            if (parser) url.query = parser(url.query);

            //
            // We should not add port numbers if they are already the default port number
            // for a given protocol. As the host also contains the port number we're going
            // override it with the hostname which contains no port number.
            //
            if (!required(url.port, url.protocol)) {
                url.host = url.hostname;
                url.port = '';
            }

            //
            // Parse down the `auth` for the username and password.
            //
            url.username = url.password = '';
            if (url.auth) {
                instruction = url.auth.split(':');
                url.username = instruction[0] || '';
                url.password = instruction[1] || '';
            }

            //
            // The href is just the compiled result.
            //
            url.href = url.toString();
        }

        /**
        * This is convenience method for changing properties in the URL instance to
        * insure that they all propagate correctly.
        *
        * @param {String} prop          Property we need to adjust.
        * @param {Mixed} value          The newly assigned value.
        * @param {Boolean|Function} fn  When setting the query, it will be the function used to parse
        *                               the query.
        *                               When setting the protocol, double slash will be removed from
        *                               the final url if it is true.
        * @returns {URL}
        * @api public
        */
        URL.prototype.set = function set(part, value, fn) {
            var url = this;

            if ('query' === part) {
                if ('string' === typeof value && value.length) {
                    value = (fn || qs.parse)(value);
                }

                url[part] = value;
            } else if ('port' === part) {
                url[part] = value;

                if (!required(value, url.protocol)) {
                    url.host = url.hostname;
                    url[part] = '';
                } else if (value) {
                    url.host = url.hostname +':'+ value;
                }
            } else if ('hostname' === part) {
                url[part] = value;

                if (url.port) value += ':'+ url.port;
                url.host = value;
            } else if ('host' === part) {
                url[part] = value;

                if (/\:\d+/.test(value)) {
                    value = value.split(':');
                    url.hostname = value[0];
                    url.port = value[1];
                }
            } else if ('protocol' === part) {
                url.protocol = value;
                url.slashes = !fn;
            } else {
                url[part] = value;
            }

            url.href = url.toString();
            return url;
        };

        /**
        * Transform the properties back in to a valid and full URL string.
        *
        * @param {Function} stringify Optional query stringify function.
        * @returns {String}
        * @api public
        */
        URL.prototype.toString = function toString(stringify) {
            if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

            var query
            , url = this
            , protocol = url.protocol;

            if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

            var result = protocol + (url.slashes ? '//' : '');

            if (url.username) {
                result += url.username;
                if (url.password) result += ':'+ url.password;
                result += '@';
            }

            result += url.hostname;
            if (url.port) result += ':'+ url.port;

            result += url.pathname;

            query = 'object' === typeof url.query ? stringify(url.query) : url.query;
            if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

            if (url.hash) result += url.hash;

            return result;
        };

        //
        // Expose the URL parser and some additional properties that might be useful for
        // others.
        //
        URL.qs = qs;
        URL.location = lolcation;
        module.exports = URL;

    },{"./lolcation":12,"querystringify":6,"requires-port":9}],12:[function(_dereq_,module,exports){
        (function (global){
            'use strict';

            var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

            /**
            * These properties should not be copied or inherited from. This is only needed
            * for all non blob URL's as a blob URL does not include a hash, only the
            * origin.
            *
            * @type {Object}
            * @private
            */
            var ignore = { hash: 1, query: 1 }
            , URL;

            /**
            * The location object differs when your code is loaded through a normal page,
            * Worker or through a worker using a blob. And with the blobble begins the
            * trouble as the location object will contain the URL of the blob, not the
            * location of the page where our code is loaded in. The actual origin is
            * encoded in the `pathname` so we can thankfully generate a good "default"
            * location from it so we can generate proper relative URL's again.
            *
            * @param {Object|String} loc Optional default location object.
            * @returns {Object} lolcation object.
            * @api public
            */
            module.exports = function lolcation(loc) {
                loc = loc || global.location || {};
                URL = URL || _dereq_('./');

                var finaldestination = {}
                , type = typeof loc
                , key;

                if ('blob:' === loc.protocol) {
                    finaldestination = new URL(unescape(loc.pathname), {});
                } else if ('string' === type) {
                    finaldestination = new URL(loc, {});
                    for (key in ignore) delete finaldestination[key];
                } else if ('object' === type) {
                    for (key in loc) {
                        if (key in ignore) continue;
                        finaldestination[key] = loc[key];
                    }

                    if (finaldestination.slashes === undefined) {
                        finaldestination.slashes = slashes.test(loc.href);
                    }
                }

                return finaldestination;
            };

        }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./":11}],13:[function(_dereq_,module,exports){
        'use strict';

        var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
        , length = 64
        , map = {}
        , seed = 0
        , i = 0
        , prev;

        /**
        * Return a string representing the specified number.
        *
        * @param {Number} num The number to convert.
        * @returns {String} The string representation of the number.
        * @api public
        */
        function encode(num) {
            var encoded = '';

            do {
                encoded = alphabet[num % length] + encoded;
                num = Math.floor(num / length);
            } while (num > 0);

            return encoded;
        }

        /**
        * Return the integer value specified by the given string.
        *
        * @param {String} str The string to convert.
        * @returns {Number} The integer value represented by the string.
        * @api public
        */
        function decode(str) {
            var decoded = 0;

            for (i = 0; i < str.length; i++) {
                decoded = decoded * length + map[str.charAt(i)];
            }

            return decoded;
        }

        /**
        * Yeast: A tiny growing id generator.
        *
        * @returns {String} A unique id.
        * @api public
        */
        function yeast() {
            var now = encode(+new Date());

            if (now !== prev) return seed = 0, prev = now;
            return now +'.'+ encode(seed++);
        }

        //
        // Map each character to its index.
        //
        for (; i < length; i++) map[alphabet[i]] = i;

        //
        // Expose the `yeast`, `encode` and `decode` functions.
        //
        yeast.encode = encode;
        yeast.decode = decode;
        module.exports = yeast;

    },{}],14:[function(_dereq_,module,exports){
        /*globals require, define */
        'use strict';

        var EventEmitter = _dereq_('eventemitter3')
        , TickTock = _dereq_('tick-tock')
        , Recovery = _dereq_('recovery')
        , qs = _dereq_('querystringify')
        , destroy = _dereq_('demolish')
        , yeast = _dereq_('yeast')
        , u2028 = /\u2028/g
        , u2029 = /\u2029/g;

        /**
        * Context assertion, ensure that some of our public Primus methods are called
        * with the correct context to ensure that
        *
        * @param {Primus} self The context of the function.
        * @param {String} method The method name.
        * @api private
        */
        function context(self, method) {
            if (self instanceof Primus) return;

            var failure = new Error('Primus#'+ method + '\'s context should called with a Primus instance');

            if ('function' !== typeof self.listeners || !self.listeners('error').length) {
                throw failure;
            }

            self.emit('error', failure);
        }

        //
        // Sets the default connection URL, it uses the default origin of the browser
        // when supported but degrades for older browsers. In Node.js, we cannot guess
        // where the user wants to connect to, so we just default to localhost.
        //
        var defaultUrl;

        try {
            if (location.origin) {
                defaultUrl = location.origin;
            } else {
                defaultUrl = location.protocol +'//'+ location.host;
            }
        } catch (e) {
            defaultUrl = 'http://127.0.0.1';
        }

        /**
        * Primus is a real-time library agnostic framework for establishing real-time
        * connections with servers.
        *
        * Options:
        * - reconnect, configuration for the reconnect process.
        * - manual, don't automatically call `.open` to start the connection.
        * - websockets, force the use of WebSockets, even when you should avoid them.
        * - timeout, connect timeout, server didn't respond in a timely manner.
        * - ping, The heartbeat interval for sending a ping packet to the server.
        * - pong, The heartbeat timeout for receiving a response to the ping.
        * - network, Use network events as leading method for network connection drops.
        * - strategy, Reconnection strategies.
        * - transport, Transport options.
        * - url, uri, The URL to use connect with the server.
        *
        * @constructor
        * @param {String} url The URL of your server.
        * @param {Object} options The configuration.
        * @api public
        */
        function Primus(url, options) {
            if (!(this instanceof Primus)) return new Primus(url, options);
            if ('function' !== typeof this.client) {
                var message = 'The client library has not been compiled correctly, ' +
                'see https://github.com/primus/primus#client-library for more details';
                return this.critical(new Error(message));
            }

            if ('object' === typeof url) {
                options = url;
                url = options.url || options.uri || defaultUrl;
            } else {
                options = options || {};
            }

            var primus = this;

            // The maximum number of messages that can be placed in queue.
            options.queueSize = 'queueSize' in options ? options.queueSize : Infinity;

            // Connection timeout duration.
            options.timeout = 'timeout' in options ? options.timeout : 10e3;

            // Stores the back off configuration.
            options.reconnect = 'reconnect' in options ? options.reconnect : {};

            // Heartbeat ping interval.
            options.ping = 'ping' in options ? options.ping : 25000;

            // Heartbeat pong response timeout.
            options.pong = 'pong' in options ? options.pong : 10e3;

            // Reconnect strategies.
            options.strategy = 'strategy' in options ? options.strategy : [];

            // Custom transport options.
            options.transport = 'transport' in options ? options.transport : {};

            primus.buffer = [];                           // Stores premature send data.
            primus.writable = true;                       // Silly stream compatibility.
            primus.readable = true;                       // Silly stream compatibility.
            primus.url = primus.parse(url || defaultUrl); // Parse the URL to a readable format.
            primus.readyState = Primus.CLOSED;            // The readyState of the connection.
            primus.options = options;                     // Reference to the supplied options.
            primus.timers = new TickTock(this);           // Contains all our timers.
            primus.socket = null;                         // Reference to the internal connection.
            primus.latency = 0;                           // Latency between messages.
            primus.disconnect = false;                    // Did we receive a disconnect packet?
            primus.transport = options.transport;         // Transport options.
            primus.transformers = {                       // Message transformers.
                outgoing: [],
                incoming: []
            };

            //
            // Create our reconnection instance.
            //
            primus.recovery = new Recovery(options.reconnect);

            //
            // Parse the reconnection strategy. It can have the following strategies:
            //
            // - timeout: Reconnect when we have a network timeout.
            // - disconnect: Reconnect when we have an unexpected disconnect.
            // - online: Reconnect when we're back online.
            //
            if ('string' === typeof options.strategy) {
                options.strategy = options.strategy.split(/\s?\,\s?/g);
            }

            if (false === options.strategy) {
                //
                // Strategies are disabled, but we still need an empty array to join it in
                // to nothing.
                //
                options.strategy = [];
            } else if (!options.strategy.length) {
                options.strategy.push('disconnect', 'online');

                //
                // Timeout based reconnection should only be enabled conditionally. When
                // authorization is enabled it could trigger.
                //
                if (!this.authorization) options.strategy.push('timeout');
            }

            options.strategy = options.strategy.join(',').toLowerCase();

            //
            // Force the use of WebSockets, even when we've detected some potential
            // broken WebSocket implementation.
            //
            if ('websockets' in options) {
                primus.AVOID_WEBSOCKETS = !options.websockets;
            }

            //
            // Force or disable the use of NETWORK events as leading client side
            // disconnection detection.
            //
            if ('network' in options) {
                primus.NETWORK_EVENTS = options.network;
            }

            //
            // Check if the user wants to manually initialise a connection. If they don't,
            // we want to do it after a really small timeout so we give the users enough
            // time to listen for `error` events etc.
            //
            if (!options.manual) primus.timers.setTimeout('open', function open() {
                primus.timers.clear('open');
                primus.open();
            }, 0);

            primus.initialise(options);
        }

        /**
        * Simple require wrapper to make browserify, node and require.js play nice.
        *
        * @param {String} name The module to require.
        * @returns {Object|Undefined} The module that we required.
        * @api private
        */
        Primus.requires = Primus.require = function requires(name) {
            if ('function' !== typeof _dereq_) return undefined;

            return !('function' === typeof define && define.amd)
            ? _dereq_(name)
            : undefined;
        };

        //
        // It's possible that we're running in Node.js or in a Node.js compatible
        // environment. In this cases we inherit from the Stream base class.
        //
        var Stream;

        try {
            Primus.Stream = Stream = Primus.requires('stream');

            //
            // Normally inheritance is done in the same way as we do in our catch
            // statement. But due to changes to the EventEmitter interface in Node 0.10
            // this will trigger annoying memory leak warnings and other potential issues
            // outlined in the issue linked below.
            //
            // @see https://github.com/joyent/node/issues/4971
            //
            Primus.requires('util').inherits(Primus, Stream);
        } catch (e) {
            Primus.Stream = EventEmitter;
            Primus.prototype = new EventEmitter();
        }

        /**
        * Primus readyStates, used internally to set the correct ready state.
        *
        * @type {Number}
        * @private
        */
        Primus.OPENING = 1;   // We're opening the connection.
        Primus.CLOSED  = 2;   // No active connection.
        Primus.OPEN    = 3;   // The connection is open.

        /**
        * Are we working with a potentially broken WebSockets implementation? This
        * boolean can be used by transformers to remove `WebSockets` from their
        * supported transports.
        *
        * @type {Boolean}
        * @private
        */
        Primus.prototype.AVOID_WEBSOCKETS = false;

        /**
        * Some browsers support registering emitting `online` and `offline` events when
        * the connection has been dropped on the client. We're going to detect it in
        * a simple `try {} catch (e) {}` statement so we don't have to do complicated
        * feature detection.
        *
        * @type {Boolean}
        * @private
        */
        Primus.prototype.NETWORK_EVENTS = false;
        Primus.prototype.online = true;

        try {
            if (
                Primus.prototype.NETWORK_EVENTS = 'onLine' in navigator
                && (window.addEventListener || document.body.attachEvent)
            ) {
                if (!navigator.onLine) {
                    Primus.prototype.online = false;
                }
            }
        } catch (e) { }

        /**
        * The Ark contains all our plugins definitions. It's namespaced by
        * name => plugin.
        *
        * @type {Object}
        * @private
        */
        Primus.prototype.ark = {};

        /**
        * Simple emit wrapper that returns a function that emits an event once it's
        * called. This makes it easier for transports to emit specific events.
        *
        * @returns {Function} A function that will emit the event when called.
        * @api public
        */
        Primus.prototype.emits = _dereq_('emits');

        /**
        * Return the given plugin.
        *
        * @param {String} name The name of the plugin.
        * @returns {Object|undefined} The plugin or undefined.
        * @api public
        */
        Primus.prototype.plugin = function plugin(name) {
            context(this, 'plugin');

            if (name) return this.ark[name];

            var plugins = {};

            for (name in this.ark) {
                plugins[name] = this.ark[name];
            }

            return plugins;
        };

        /**
        * Checks if the given event is an emitted event by Primus.
        *
        * @param {String} evt The event name.
        * @returns {Boolean} Indication of the event is reserved for internal use.
        * @api public
        */
        Primus.prototype.reserved = function reserved(evt) {
            return (/^(incoming|outgoing)::/).test(evt)
            || evt in this.reserved.events;
        };

        /**
        * The actual events that are used by the client.
        *
        * @type {Object}
        * @public
        */
        Primus.prototype.reserved.events = {
            'reconnect scheduled': 1,
            'reconnect timeout': 1,
            'readyStateChange': 1,
            'reconnect failed': 1,
            'reconnected': 1,
            'reconnect': 1,
            'offline': 1,
            'timeout': 1,
            'online': 1,
            'error': 1,
            'close': 1,
            'open': 1,
            'data': 1,
            'end': 1
        };

        /**
        * Initialise the Primus and setup all parsers and internal listeners.
        *
        * @param {Object} options The original options object.
        * @returns {Primus}
        * @api private
        */
        Primus.prototype.initialise = function initialise(options) {
            var primus = this
            , start;

            primus.recovery
            .on('reconnected', primus.emits('reconnected'))
            .on('reconnect failed', primus.emits('reconnect failed', function failed(next) {
                primus.emit('end');
                next();
            }))
            .on('reconnect timeout', primus.emits('reconnect timeout'))
            .on('reconnect scheduled', primus.emits('reconnect scheduled'))
            .on('reconnect', primus.emits('reconnect', function reconnect(next) {
                primus.emit('outgoing::reconnect');
                next();
            }));

            primus.on('outgoing::open', function opening() {
                var readyState = primus.readyState;

                primus.readyState = Primus.OPENING;
                if (readyState !== primus.readyState) {
                    primus.emit('readyStateChange', 'opening');
                }

                start = +new Date();
            });

            primus.on('incoming::open', function opened() {
                var readyState = primus.readyState;

                if (primus.recovery.reconnecting()) {
                    primus.recovery.reconnected();
                }

                //
                // The connection has been opened so we should set our state to
                // (writ|read)able so our stream compatibility works as intended.
                //
                primus.writable = true;
                primus.readable = true;

                //
                // Make sure we are flagged as `online` as we've successfully opened the
                // connection.
                //
                if (!primus.online) {
                    primus.online = true;
                    primus.emit('online');
                }

                primus.readyState = Primus.OPEN;
                if (readyState !== primus.readyState) {
                    primus.emit('readyStateChange', 'open');
                }

                primus.latency = +new Date() - start;
                primus.timers.clear('ping', 'pong');
                primus.heartbeat();

                if (primus.buffer.length) {
                    var data = primus.buffer.slice()
                    , length = data.length
                    , i = 0;

                    primus.buffer.length = 0;

                    for (; i < length; i++) {
                        primus._write(data[i]);
                    }
                }

                primus.emit('open');
            });

            primus.on('incoming::pong', function pong(time) {
                primus.online = true;
                primus.timers.clear('pong');
                primus.heartbeat();

                primus.latency = (+new Date()) - time;
            });

            primus.on('incoming::error', function error(e) {
                var connect = primus.timers.active('connect')
                , err = e;

                //
                // When the error is not an Error instance we try to normalize it.
                //
                if ('string' === typeof e) {
                    err = new Error(e);
                } else if (!(e instanceof Error) && 'object' === typeof e) {
                    //
                    // BrowserChannel and SockJS returns an object which contains some
                    // details of the error. In order to have a proper error we "copy" the
                    // details in an Error instance.
                    //
                    err = new Error(e.message || e.reason);
                    for (var key in e) {
                        if (Object.prototype.hasOwnProperty.call(e, key))
                        err[key] = e[key];
                    }
                }
                //
                // We're still doing a reconnect attempt, it could be that we failed to
                // connect because the server was down. Failing connect attempts should
                // always emit an `error` event instead of a `open` event.
                //
                //
                if (primus.recovery.reconnecting()) return primus.recovery.reconnected(err);
                if (primus.listeners('error').length) primus.emit('error', err);

                //
                // We received an error while connecting, this most likely the result of an
                // unauthorized access to the server.
                //
                if (connect) {
                    if (~primus.options.strategy.indexOf('timeout')) {
                        primus.recovery.reconnect();
                    } else {
                        primus.end();
                    }
                }
            });

            primus.on('incoming::data', function message(raw) {
                primus.decoder(raw, function decoding(err, data) {
                    //
                    // Do a "safe" emit('error') when we fail to parse a message. We don't
                    // want to throw here as listening to errors should be optional.
                    //
                    if (err) return primus.listeners('error').length && primus.emit('error', err);

                    //
                    // Handle all "primus::" prefixed protocol messages.
                    //
                    if (primus.protocol(data)) return;
                    primus.transforms(primus, primus, 'incoming', data, raw);
                });
            });

            primus.on('incoming::end', function end() {
                var readyState = primus.readyState;

                //
                // This `end` started with the receiving of a primus::server::close packet
                // which indicated that the user/developer on the server closed the
                // connection and it was not a result of a network disruption. So we should
                // kill the connection without doing a reconnect.
                //
                if (primus.disconnect) {
                    primus.disconnect = false;

                    return primus.end();
                }

                //
                // Always set the readyState to closed, and if we're still connecting, close
                // the connection so we're sure that everything after this if statement block
                // is only executed because our readyState is set to `open`.
                //
                primus.readyState = Primus.CLOSED;
                if (readyState !== primus.readyState) {
                    primus.emit('readyStateChange', 'end');
                }

                if (primus.timers.active('connect')) primus.end();
                if (readyState !== Primus.OPEN) {
                    return primus.recovery.reconnecting()
                    ? primus.recovery.reconnect()
                    : false;
                }

                this.writable = false;
                this.readable = false;

                //
                // Clear all timers in case we're not going to reconnect.
                //
                this.timers.clear();

                //
                // Fire the `close` event as an indication of connection disruption.
                // This is also fired by `primus#end` so it is emitted in all cases.
                //
                primus.emit('close');

                //
                // The disconnect was unintentional, probably because the server has
                // shutdown, so if the reconnection is enabled start a reconnect procedure.
                //
                if (~primus.options.strategy.indexOf('disconnect')) {
                    return primus.recovery.reconnect();
                }

                primus.emit('outgoing::end');
                primus.emit('end');
            });

            //
            // Setup the real-time client.
            //
            primus.client();

            //
            // Process the potential plugins.
            //
            for (var plugin in primus.ark) {
                primus.ark[plugin].call(primus, primus, options);
            }

            //
            // NOTE: The following code is only required if we're supporting network
            // events as it requires access to browser globals.
            //
            if (!primus.NETWORK_EVENTS) return primus;

            /**
            * Handler for offline notifications.
            *
            * @api private
            */
            primus.offlineHandler = function offline() {
                if (!primus.online) return; // Already or still offline, bailout.

                primus.online = false;
                primus.emit('offline');
                primus.end();

                //
                // It is certainly possible that we're in a reconnection loop and that the
                // user goes offline. In this case we want to kill the existing attempt so
                // when the user goes online, it will attempt to reconnect freshly again.
                //
                primus.recovery.reset();
            };

            /**
            * Handler for online notifications.
            *
            * @api private
            */
            primus.onlineHandler = function online() {
                if (primus.online) return; // Already or still online, bailout.

                primus.online = true;
                primus.emit('online');

                if (~primus.options.strategy.indexOf('online')) {
                    primus.recovery.reconnect();
                }
            };

            if (window.addEventListener) {
                window.addEventListener('offline', primus.offlineHandler, false);
                window.addEventListener('online', primus.onlineHandler, false);
            } else if (document.body.attachEvent){
                document.body.attachEvent('onoffline', primus.offlineHandler);
                document.body.attachEvent('ononline', primus.onlineHandler);
            }

            return primus;
        };

        /**
        * Really dead simple protocol parser. We simply assume that every message that
        * is prefixed with `primus::` could be used as some sort of protocol definition
        * for Primus.
        *
        * @param {String} msg The data.
        * @returns {Boolean} Is a protocol message.
        * @api private
        */
        Primus.prototype.protocol = function protocol(msg) {
            if (
                'string' !== typeof msg
                || msg.indexOf('primus::') !== 0
            ) return false;

            var last = msg.indexOf(':', 8)
            , value = msg.slice(last + 2);

            switch (msg.slice(8,  last)) {
                case 'pong':
                this.emit('incoming::pong', +value);
                break;

                case 'server':
                //
                // The server is closing the connection, forcefully disconnect so we don't
                // reconnect again.
                //
                if ('close' === value) {
                    this.disconnect = true;
                }
                break;

                case 'id':
                this.emit('incoming::id', value);
                break;

                //
                // Unknown protocol, somebody is probably sending `primus::` prefixed
                // messages.
                //
                default:
                return false;
            }

            return true;
        };

        /**
        * Execute the set of message transformers from Primus on the incoming or
        * outgoing message.
        * This function and it's content should be in sync with Spark#transforms in
        * spark.js.
        *
        * @param {Primus} primus Reference to the Primus instance with message transformers.
        * @param {Spark|Primus} connection Connection that receives or sends data.
        * @param {String} type The type of message, 'incoming' or 'outgoing'.
        * @param {Mixed} data The data to send or that has been received.
        * @param {String} raw The raw encoded data.
        * @returns {Primus}
        * @api public
        */
        Primus.prototype.transforms = function transforms(primus, connection, type, data, raw) {
            var packet = { data: data }
            , fns = primus.transformers[type];

            //
            // Iterate in series over the message transformers so we can allow optional
            // asynchronous execution of message transformers which could for example
            // retrieve additional data from the server, do extra decoding or even
            // message validation.
            //
            (function transform(index, done) {
                var transformer = fns[index++];

                if (!transformer) return done();

                if (1 === transformer.length) {
                    if (false === transformer.call(connection, packet)) {
                        //
                        // When false is returned by an incoming transformer it means that's
                        // being handled by the transformer and we should not emit the `data`
                        // event.
                        //
                        return;
                    }

                    return transform(index, done);
                }

                transformer.call(connection, packet, function finished(err, arg) {
                    if (err) return connection.emit('error', err);
                    if (false === arg) return;

                    transform(index, done);
                });
            }(0, function done() {
                //
                // We always emit 2 arguments for the data event, the first argument is the
                // parsed data and the second argument is the raw string that we received.
                // This allows you, for example, to do some validation on the parsed data
                // and then save the raw string in your database without the stringify
                // overhead.
                //
                if ('incoming' === type) return connection.emit('data', packet.data, raw);

                connection._write(packet.data);
            }));

            return this;
        };

        /**
        * Retrieve the current id from the server.
        *
        * @param {Function} fn Callback function.
        * @returns {Primus}
        * @api public
        */
        Primus.prototype.id = function id(fn) {
            if (this.socket && this.socket.id) return fn(this.socket.id);

            this._write('primus::id::');
            return this.once('incoming::id', fn);
        };

        /**
        * Establish a connection with the server. When this function is called we
        * assume that we don't have any open connections. If you do call it when you
        * have a connection open, it could cause duplicate connections.
        *
        * @returns {Primus}
        * @api public
        */
        Primus.prototype.open = function open() {
            context(this, 'open');

            //
            // Only start a `connection timeout` procedure if we're not reconnecting as
            // that shouldn't count as an initial connection. This should be started
            // before the connection is opened to capture failing connections and kill the
            // timeout.
            //
            if (!this.recovery.reconnecting() && this.options.timeout) this.timeout();

            this.emit('outgoing::open');
            return this;
        };

        /**
        * Send a new message.
        *
        * @param {Mixed} data The data that needs to be written.
        * @returns {Boolean} Always returns true as we don't support back pressure.
        * @api public
        */
        Primus.prototype.write = function write(data) {
            context(this, 'write');
            this.transforms(this, this, 'outgoing', data);

            return true;
        };

        /**
        * The actual message writer.
        *
        * @param {Mixed} data The message that needs to be written.
        * @returns {Boolean} Successful write to the underlaying transport.
        * @api private
        */
        Primus.prototype._write = function write(data) {
            var primus = this;

            //
            // The connection is closed, normally this would already be done in the
            // `spark.write` method, but as `_write` is used internally, we should also
            // add the same check here to prevent potential crashes by writing to a dead
            // socket.
            //
            if (Primus.OPEN !== primus.readyState) {
                //
                // If the buffer is at capacity, remove the first item.
                //
                if (this.buffer.length === this.options.queueSize) {
                    this.buffer.splice(0, 1);
                }

                this.buffer.push(data);
                return false;
            }

            primus.encoder(data, function encoded(err, packet) {
                //
                // Do a "safe" emit('error') when we fail to parse a message. We don't
                // want to throw here as listening to errors should be optional.
                //
                if (err) return primus.listeners('error').length && primus.emit('error', err);

                //
                // Hack 1: \u2028 and \u2029 are allowed inside a JSON string, but JavaScript
                // defines them as newline separators. Unescaped control characters are not
                // allowed inside JSON strings, so this causes an error at parse time. We
                // work around this issue by escaping these characters. This can cause
                // errors with JSONP requests or if the string is just evaluated.
                //
                if ('string' === typeof packet) {
                    if (~packet.indexOf('\u2028')) packet = packet.replace(u2028, '\\u2028');
                    if (~packet.indexOf('\u2029')) packet = packet.replace(u2029, '\\u2029');
                }

                primus.emit('outgoing::data', packet);
            });

            return true;
        };

        /**
        * Send a new heartbeat over the connection to ensure that we're still
        * connected and our internet connection didn't drop. We cannot use server side
        * heartbeats for this unfortunately.
        *
        * @returns {Primus}
        * @api private
        */
        Primus.prototype.heartbeat = function heartbeat() {
            var primus = this;

            if (!primus.options.ping) return primus;

            /**
            * Exterminate the connection as we've timed out.
            *
            * @api private
            */
            function pong() {
                primus.timers.clear('pong');

                //
                // The network events already captured the offline event.
                //
                if (!primus.online) return;

                primus.online = false;
                primus.emit('offline');
                primus.emit('incoming::end');
            }

            /**
            * We should send a ping message to the server.
            *
            * @api private
            */
            function ping() {
                var value = +new Date();

                primus.timers.clear('ping');
                primus._write('primus::ping::'+ value);
                primus.emit('outgoing::ping', value);
                primus.timers.setTimeout('pong', pong, primus.options.pong);
            }

            primus.timers.setTimeout('ping', ping, primus.options.ping);
            return this;
        };

        /**
        * Start a connection timeout.
        *
        * @returns {Primus}
        * @api private
        */
        Primus.prototype.timeout = function timeout() {
            var primus = this;

            /**
            * Remove all references to the timeout listener as we've received an event
            * that can be used to determine state.
            *
            * @api private
            */
            function remove() {
                primus.removeListener('error', remove)
                .removeListener('open', remove)
                .removeListener('end', remove)
                .timers.clear('connect');
            }

            primus.timers.setTimeout('connect', function expired() {
                remove(); // Clean up old references.

                if (primus.readyState === Primus.OPEN || primus.recovery.reconnecting()) {
                    return;
                }

                primus.emit('timeout');

                //
                // We failed to connect to the server.
                //
                if (~primus.options.strategy.indexOf('timeout')) {
                    primus.recovery.reconnect();
                } else {
                    primus.end();
                }
            }, primus.options.timeout);

            return primus.on('error', remove)
            .on('open', remove)
            .on('end', remove);
        };

        /**
        * Close the connection completely.
        *
        * @param {Mixed} data last packet of data.
        * @returns {Primus}
        * @api public
        */
        Primus.prototype.end = function end(data) {
            context(this, 'end');

            if (
                this.readyState === Primus.CLOSED
                && !this.timers.active('connect')
                && !this.timers.active('open')
            ) {
                //
                // If we are reconnecting stop the reconnection procedure.
                //
                if (this.recovery.reconnecting()) {
                    this.recovery.reset();
                    this.emit('end');
                }

                return this;
            }

            if (data !== undefined) this.write(data);

            this.writable = false;
            this.readable = false;

            var readyState = this.readyState;
            this.readyState = Primus.CLOSED;

            if (readyState !== this.readyState) {
                this.emit('readyStateChange', 'end');
            }

            this.timers.clear();
            this.emit('outgoing::end');
            this.emit('close');
            this.emit('end');

            return this;
        };

        /**
        * Completely demolish the Primus instance and forcefully nuke all references.
        *
        * @returns {Boolean}
        * @api public
        */
        Primus.prototype.destroy = destroy('url timers options recovery socket transport transformers', {
            before: 'end',
            after: ['removeAllListeners', function detach() {
                if (!this.NETWORK_EVENTS) return;

                if (window.addEventListener) {
                    window.removeEventListener('offline', this.offlineHandler);
                    window.removeEventListener('online', this.onlineHandler);
                } else if (document.body.attachEvent){
                    document.body.detachEvent('onoffline', this.offlineHandler);
                    document.body.detachEvent('ononline', this.onlineHandler);
                }
            }]
        });

        /**
        * Create a shallow clone of a given object.
        *
        * @param {Object} obj The object that needs to be cloned.
        * @returns {Object} Copy.
        * @api private
        */
        Primus.prototype.clone = function clone(obj) {
            return this.merge({}, obj);
        };

        /**
        * Merge different objects in to one target object.
        *
        * @param {Object} target The object where everything should be merged in.
        * @returns {Object} Original target with all merged objects.
        * @api private
        */
        Primus.prototype.merge = function merge(target) {
            for (var i = 1, key, obj; i < arguments.length; i++) {
                obj = arguments[i];

                for (key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key))
                    target[key] = obj[key];
                }
            }

            return target;
        };

        /**
        * Parse the connection string.
        *
        * @type {Function}
        * @param {String} url Connection URL.
        * @returns {Object} Parsed connection.
        * @api private
        */
        Primus.prototype.parse = _dereq_('url-parse');

        /**
        * Parse a query string.
        *
        * @param {String} query The query string that needs to be parsed.
        * @returns {Object} Parsed query string.
        * @api private
        */
        Primus.prototype.querystring = qs.parse;
        /**
        * Transform a query string object back into string equiv.
        *
        * @param {Object} obj The query string object.
        * @returns {String}
        * @api private
        */
        Primus.prototype.querystringify = qs.stringify;

        /**
        * Generates a connection URI.
        *
        * @param {String} protocol The protocol that should used to crate the URI.
        * @returns {String|options} The URL.
        * @api private
        */
        Primus.prototype.uri = function uri(options) {
            var url = this.url
            , server = []
            , qsa = false;

            //
            // Query strings are only allowed when we've received clearance for it.
            //
            if (options.query) qsa = true;

            options = options || {};
            options.protocol = 'protocol' in options
            ? options.protocol
            : 'http:';
            options.query = url.query && qsa
            ? url.query.slice(1)
            : false;
            options.secure = 'secure' in options
            ? options.secure
            : url.protocol === 'https:' || url.protocol === 'wss:';
            options.auth = 'auth' in options
            ? options.auth
            : url.auth;
            options.pathname = 'pathname' in options
            ? options.pathname
            : this.pathname;
            options.port = 'port' in options
            ? +options.port
            : +url.port || (options.secure ? 443 : 80);

            //
            // Allow transformation of the options before we construct a full URL from it.
            //
            this.emit('outgoing::url', options);

            //
            // We need to make sure that we create a unique connection URL every time to
            // prevent back forward cache from becoming an issue. We're doing this by
            // forcing an cache busting query string in to the URL.
            //
            var querystring = this.querystring(options.query || '');
            querystring._primuscb = yeast();
            options.query = this.querystringify(querystring);

            //
            // Automatically suffix the protocol so we can supply `ws:` and `http:` and
            // it gets transformed correctly.
            //
            server.push(options.secure ? options.protocol.replace(':', 's:') : options.protocol, '');

            server.push(options.auth ? options.auth +'@'+ url.host : url.host);

            //
            // Pathnames are optional as some Transformers would just use the pathname
            // directly.
            //
            if (options.pathname) server.push(options.pathname.slice(1));

            //
            // Optionally add a search query.
            //
            if (qsa) server[server.length - 1] += '?'+ options.query;
            else delete options.query;

            if (options.object) return options;
            return server.join('/');
        };

        /**
        * Register a new message transformer. This allows you to easily manipulate incoming
        * and outgoing data which is particularity handy for plugins that want to send
        * meta data together with the messages.
        *
        * @param {String} type Incoming or outgoing
        * @param {Function} fn A new message transformer.
        * @returns {Primus}
        * @api public
        */
        Primus.prototype.transform = function transform(type, fn) {
            context(this, 'transform');

            if (!(type in this.transformers)) {
                return this.critical(new Error('Invalid transformer type'));
            }

            this.transformers[type].push(fn);
            return this;
        };

        /**
        * A critical error has occurred, if we have an `error` listener, emit it there.
        * If not, throw it, so we get a stack trace + proper error message.
        *
        * @param {Error} err The critical error.
        * @returns {Primus}
        * @api private
        */
        Primus.prototype.critical = function critical(err) {
            if (this.listeners('error').length) {
                this.emit('error', err);
                return this;
            }

            throw err;
        };

        /**
        * Syntax sugar, adopt a Socket.IO like API.
        *
        * @param {String} url The URL we want to connect to.
        * @param {Object} options Connection options.
        * @returns {Primus}
        * @api public
        */
        Primus.connect = function connect(url, options) {
            return new Primus(url, options);
        };

        //
        // Expose the EventEmitter so it can be re-used by wrapping libraries we're also
        // exposing the Stream interface.
        //
        Primus.EventEmitter = EventEmitter;

        //
        // These libraries are automatically inserted at the server-side using the
        // Primus#library method.
        //
        Primus.prototype.client = function client() {
            var primus = this
            , socket;

            //
            // Select an available WebSocket factory.
            //
            var Factory = (function factory() {
                if ('undefined' !== typeof WebSocket) return WebSocket;
                if ('undefined' !== typeof MozWebSocket) return MozWebSocket;

                try { return Primus.requires('ws'); }
                catch (e) {}

                return undefined;
            })();

            if (!Factory) return primus.critical(new Error(
                'Missing required `ws` module. Please run `npm install --save ws`'
            ));

            //
            // Connect to the given URL.
            //
            primus.on('outgoing::open', function opening() {
                primus.emit('outgoing::end');

                //
                // FireFox will throw an error when we try to establish a connection from
                // a secure page to an unsecured WebSocket connection. This is inconsistent
                // behaviour between different browsers. This should ideally be solved in
                // Primus when we connect.
                //
                try {
                    var prot = primus.url.protocol === 'ws+unix:' ? 'ws+unix:' : 'ws:'
                    , qsa = prot === 'ws:';

                    //
                    // Only allow primus.transport object in Node.js, it will throw in
                    // browsers with a TypeError if we supply to much arguments.
                    //
                    if (Factory.length === 3) {
                        primus.socket = socket = new Factory(
                            primus.uri({ protocol: prot, query: qsa }),   // URL
                            [],                                           // Sub protocols
                            primus.transport                              // options.
                        );
                    } else {
                        primus.socket = socket = new Factory(primus.uri({
                            protocol: prot,
                            query: qsa
                        }));

                        socket.binaryType = 'arraybuffer';
                    }
                } catch (e) { return primus.emit('error', e); }

                //
                // Setup the Event handlers.
                //
                socket.onopen = primus.emits('incoming::open');
                socket.onerror = primus.emits('incoming::error');
                socket.onclose = primus.emits('incoming::end');
                socket.onmessage = primus.emits('incoming::data', function parse(next, evt) {
                    next(undefined, evt.data);
                });
            });

            //
            // We need to write a new message to the socket.
            //
            primus.on('outgoing::data', function write(message) {
                if (!socket || socket.readyState !== Factory.OPEN) return;

                try { socket.send(message); }
                catch (e) { primus.emit('incoming::error', e); }
            });

            //
            // Attempt to reconnect the socket.
            //
            primus.on('outgoing::reconnect', function reconnect() {
                primus.emit('outgoing::open');
            });

            //
            // We need to close the socket.
            //
            primus.on('outgoing::end', function close() {
                if (!socket) return;

                socket.onerror = socket.onopen = socket.onclose = socket.onmessage = function () {};
                socket.close();
                socket = null;
            });
        };
        Primus.prototype.authorization = false;
        Primus.prototype.pathname = "/primus";
        Primus.prototype.encoder = function encoder(data, fn) {
            var err;

            try { data = JSON.stringify(data); }
            catch (e) { err = e; }

            fn(err, data);
        };
        Primus.prototype.decoder = function decoder(data, fn) {
            var err;

            if ('string' !== typeof data) return fn(err, data);

            try { data = JSON.parse(data); }
            catch (e) { err = e; }

            fn(err, data);
        };
        Primus.prototype.version = "5.2.1";

        if (
            'undefined' !== typeof document
            && 'undefined' !== typeof navigator
        ) {
            //
            // Hack 2: If you press ESC in FireFox it will close all active connections.
            // Normally this makes sense, when your page is still loading. But versions
            // before FireFox 22 will close all connections including WebSocket connections
            // after page load. One way to prevent this is to do a `preventDefault()` and
            // cancel the operation before it bubbles up to the browsers default handler.
            // It needs to be added as `keydown` event, if it's added keyup it will not be
            // able to prevent the connection from being closed.
            //
            if (document.addEventListener) {
                document.addEventListener('keydown', function keydown(e) {
                    if (e.keyCode !== 27 || !e.preventDefault) return;

                    e.preventDefault();
                }, false);
            }

            //
            // Hack 3: This is a Mac/Apple bug only, when you're behind a reverse proxy or
            // have you network settings set to `automatic proxy discovery` the safari
            // browser will crash when the WebSocket constructor is initialised. There is
            // no way to detect the usage of these proxies available in JavaScript so we
            // need to do some nasty browser sniffing. This only affects Safari versions
            // lower then 5.1.4
            //
            var ua = (navigator.userAgent || '').toLowerCase()
            , parsed = ua.match(/.+(?:rv|it|ra|ie)[\/: ](\d+)\.(\d+)(?:\.(\d+))?/) || []
            , version = +[parsed[1], parsed[2]].join('.');

            if (
                !~ua.indexOf('chrome')
                && ~ua.indexOf('safari')
                && version < 534.54
            ) {
                Primus.prototype.AVOID_WEBSOCKETS = true;
            }
        }

        //
        // Expose the library.
        //
        module.exports = Primus;

    },{"demolish":1,"emits":2,"eventemitter3":3,"querystringify":6,"recovery":7,"tick-tock":10,"url-parse":11,"yeast":13}]},{},[14])(14);
    return Primus;
},
[

]);


;;;
(function(exports){
    var ActionheroClient = function(options, client){

        var self = this;

        self.callbacks = {};
        self.id = null;
        self.events = {};
        self.rooms = [];
        self.state = 'disconnected';

        self.options = self.defaults();
        for(var i in options){
            self.options[i] = options[i];
        }

        if(client){
            self.externalClient = true;
            self.client = client;
        }
    };

    if(typeof Primus === 'undefined'){
        var util = require('util');
        var EventEmitter = require('events').EventEmitter;
        util.inherits(ActionheroClient, EventEmitter);
    }else{
        ActionheroClient.prototype = new Primus.EventEmitter();
    }

    ActionheroClient.prototype.defaults = function(){
        if(window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'){
            var currentUrl = window.location.protocol + window.location.hostname + ':4000'
        } else {
            var currentUrl = window.location.protocol + window.location.hostname
        }
        return { apiPath: '/conciergechat', url: currentUrl  }
    }

    ////////////////
    // CONNECTION //
    ////////////////

    ActionheroClient.prototype.connect = function(callback){
        var self = this;
        self.messageCount = 0;


        if(self.client && self.externalClient !== true){
            self.client.end();
            self.client.removeAllListeners();
            delete self.client;
            self.client = Primus.connect(self.options.url, self.options);
        } else if(self.client && self.externalClient === true){
            self.client.end();
            self.client.open();
        }else{
            self.client = Primus.connect(self.options.url, self.options);
        }

        self.client.on('open', function(){
            self.configure(function(details){
                self.emit('connected');
                if(self.state === 'connected'){
                    //
                }else{
                    self.state = 'connected';
                    if(typeof callback === 'function'){ callback(null, details); }
                }
            });
        })

        self.client.on('error', function(error){
            self.emit('error', error);
        });

        self.client.on('reconnect', function(){
            self.messageCount = 0;
            self.emit('reconnect');
        });

        self.client.on('reconnecting', function(){
            self.emit('reconnecting');
            self.state = 'reconnecting';
            self.emit('disconnected');
        });

        self.client.on('timeout', function(){
            self.state = 'timeout';
            self.emit('timeout');
        });

        self.client.on('close', function(){
            self.messageCount = 0;
            if(self.state !== 'disconnected'){
                self.state = 'disconnected';
                self.emit('disconnected');
            }
        });

        self.client.on('end', function(){
            self.messageCount = 0;
            if(self.state !== 'disconnected'){
                self.state = 'disconnected';
                self.emit('disconnected');
            }
        });

        self.client.on('data', function(data){
            self.handleMessage(data);
        });
    }

    ActionheroClient.prototype.configure = function(callback){
        var self = this;

        self.rooms.forEach(function(room){
            self.send({event: 'roomAdd', room: room});
        });

        self.detailsView(function(details){
            self.id          = details.data.id;
            self.fingerprint = details.data.fingerprint;
            self.rooms       = details.data.rooms;
            callback(details);
        });
    }

    ///////////////
    // MESSAGING //
    ///////////////

    ActionheroClient.prototype.send = function(args, callback){
        // primus will buffer messages when not connected
        var self = this;
        self.messageCount++;
        if(typeof callback === 'function'){
            self.callbacks[self.messageCount] = callback;
        }
        self.client.write(args);
    }

    ActionheroClient.prototype.handleMessage = function(message){
        var self = this;
        self.emit('message', message);
        if(message.context === 'response'){
            if(typeof self.callbacks[message.messageCount] === 'function'){
                self.callbacks[message.messageCount](message);
            }
            delete self.callbacks[message.messageCount];
        } else if(message.context === 'user'){
            self.emit('say', message);
        } else if(message.context === 'alert'){
            self.emit('alert', message);
        } else if(message.welcome && message.context === 'api'){
            self.welcomeMessage = message.welcome;
            self.emit('welcome', message);
        } else if(message.context === 'api'){
            self.emit('api', message);
        }
    }

    /////////////
    // ACTIONS //
    /////////////

    ActionheroClient.prototype.action = function(action, params, callback){
        if(!callback && typeof params === 'function'){
            callback = params;
            params = null;
        }
        if(!params){ params = {}; }
        params.action = action;

        if(this.state !== 'connected'){
            this.actionWeb(params, callback);
        }else{
            this.actionWebSocket(params, callback);
        }
    }

    ActionheroClient.prototype.actionWeb = function(params, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            var response;
            if(xmlhttp.readyState === 4) {
                if(xmlhttp.status === 200) {
                    response = JSON.parse(xmlhttp.responseText);
                }else{
                    try{
                        response = JSON.parse(xmlhttp.responseText);
                    }catch(e){
                        response = { error: {statusText: xmlhttp.statusText, responseText: xmlhttp.responseText} };
                    }
                }
                callback(response);
            }
        };

        var method = (params.httpMethod || 'POST').toUpperCase();
        var url = this.options.url + this.options.apiPath + '?action=' + params.action;

        if (method === 'GET') {
            for (var param in params) {
                if (~['action', 'httpMethod'].indexOf(param)) continue;
                url += '&' + param + '=' + params[param];
            }
        }

        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(params));
    }


    ActionheroClient.prototype.actionWebSocket = function(params, callback){
        this.send({event: 'action',params: params}, callback);
    }

    //////////////
    // COMMANDS //
    //////////////

    ActionheroClient.prototype.say = function(room, message, callback){
        this.send({event: 'say', room: room, message: message}, callback);
    }

    ActionheroClient.prototype.file = function(file, callback){
        this.send({event: 'file', file: file}, callback);
    }

    ActionheroClient.prototype.detailsView = function(callback){
        this.send({event: 'detailsView'}, callback);
    }

    ActionheroClient.prototype.roomView = function(room, callback){
        this.send({event: 'roomView', room: room}, callback);
    }

    ActionheroClient.prototype.roomAdd = function(room, callback){
        var self = this;
        self.send({event: 'roomAdd', room: room}, function(data){
            self.configure(function(){
                if(typeof callback === 'function'){ callback(data); }
            });
        });
    }

    ActionheroClient.prototype.roomLeave = function(room, callback){
        var self = this;
        var index = self.rooms.indexOf(room);
        if(index > -1){ self.rooms.splice(index, 1); }
        this.send({event: 'roomLeave', room: room}, function(data){
            self.configure(function(){
                if(typeof callback === 'function'){ callback(data); }
            });
        });
    }

    ActionheroClient.prototype.documentation = function(callback){
        this.send({event: 'documentation'}, callback);
    }

    ActionheroClient.prototype.disconnect = function(){
        this.state = 'disconnected';
        this.client.end();
        this.emit('disconnected');
    }

    // depricated lowercase name
    var actionheroClient = ActionheroClient;

    exports.ActionheroClient = ActionheroClient;
    exports.actionheroClient = actionheroClient;
})(typeof exports === 'undefined' ? window : exports);
