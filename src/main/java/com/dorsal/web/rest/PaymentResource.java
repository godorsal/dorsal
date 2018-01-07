package com.dorsal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dorsal.domain.Payment;
import com.dorsal.repository.PaymentRepository;
import com.dorsal.domain.GlobalMetadata;
import com.dorsal.repository.GlobalMetadataRepository;
import com.dorsal.repository.UserRepository;
import com.dorsal.service.TransformData;
import com.dorsal.web.rest.util.HeaderUtil;


import java.util.HashMap;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.Balance;
import com.stripe.net.RequestOptions;
import com.stripe.net.RequestOptions.RequestOptionsBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

/**
* REST controller for managing Payment.
*/
@RestController
@RequestMapping("/api")
public class PaymentResource {

    private final Logger log = LoggerFactory.getLogger(PaymentResource.class);

    @Inject
    private PaymentRepository paymentRepository;
    @Inject
    private GlobalMetadataRepository globalMetadataRepository;

    // User repository functinality for finding currently logged in user
    @Inject
    private UserRepository userRepository;

    // Encryption/Decryption of data
    @Inject
    private TransformData transformData;

    /**
    * POST  /payments : Create a new payment.
    *
    * @param payment the payment to create
    * @return the ResponseEntity with status 201 (Created) and with body the new payment, or with status 400 (Bad Request) if the payment has already an ID
    * @throws URISyntaxException if the Location URI syntax is incorrect
    */
    @RequestMapping(value = "/payments",
    method = RequestMethod.POST,
    produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Payment> createPayment(@Valid @RequestBody Payment payment) throws URISyntaxException {
        log.debug("REST request to save Payment : {}", payment);

        if (payment.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("payment", "idexists", "A new payment cannot already have an ID")).body(null);
        }

        // Encrypt data before storing to database
        String ccencrypt = transformData.transformToSecure(payment.getCcdata());
        payment.setCcdata(ccencrypt);

        // Get the current logged in user to be used as the case creator
        payment.setUser(userRepository.findLoggedInUser());
        Payment result = paymentRepository.save(payment);
        return ResponseEntity.created(new URI("/api/payments/" + result.getId()))
        .headers(HeaderUtil.createEntityCreationAlert("payment", result.getId().toString()))
        .body(result);
    }

    /**
    * PUT  /payments : Updates an existing payment.
    *
    * @param payment the payment to update
    * @return the ResponseEntity with status 200 (OK) and with body the updated payment,
    * or with status 400 (Bad Request) if the payment is not valid,
    * or with status 500 (Internal Server Error) if the payment couldnt be updated
    * @throws URISyntaxException if the Location URI syntax is incorrect
    */
    @RequestMapping(value = "/payments",
    method = RequestMethod.PUT,
    produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Payment> updatePayment(@Valid @RequestBody Payment payment) throws URISyntaxException {
        log.debug("REST request to update Payment : {}", payment);

        if (payment.getId() == null) {
            return createPayment(payment);
        }
        // Encrypt data before storing to database
        String ccencrypt = payment.getCcdata();
        ccencrypt = transformData.transformToSecure(ccencrypt);
        payment.setCcdata(ccencrypt);

        Payment result = paymentRepository.save(payment);
        return ResponseEntity.ok()
        .headers(HeaderUtil.createEntityUpdateAlert("payment", payment.getId().toString()))
        .body(result);
    }

    /**
    * GET  /payments : get all the payments.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of payments in body
    */
    @RequestMapping(value = "/payments",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Payment> getAllPayments() {
        log.debug("REST request to get all Payments");
        List<Payment> payments = paymentRepository.findByUserIsCurrentUser();

        // Iterate ovver records and decode results
        Payment paymentRecord = null;
        String decryptValue = "";
        Iterator<Payment> itPayment = payments.iterator();
        while (itPayment.hasNext()) {
            paymentRecord = itPayment.next();
            decryptValue = transformData.transformFromSecure(paymentRecord.getCcdata());
            paymentRecord.setCcdata(decryptValue);
        }
        return payments;
    }

    /**
    * POST  /payments/saveCustomer : pay.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of payments in body
    */
    @RequestMapping(value = "/payments/saveCustomer",
    method = RequestMethod.POST,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> saveCustomer(@Valid @RequestBody String token) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();

        String[] splitToken = token.split("#");
        String uToken = splitToken[0];
        String uEmail = splitToken[1];

        responseHeaders.set("MyResponseHeader", "MyValue");
        List<GlobalMetadata> globalMetadata = globalMetadataRepository.findAll();
        for(int i = 0; i < globalMetadata.size(); i++) {
            if(globalMetadata.get(i).getName().equals("test2")){
                Stripe.apiKey = globalMetadata.get(i).getValue();

                Map<String, Object> customerParams = new HashMap<String, Object>();
                customerParams.put("email", uEmail);
                // customerParams.put("email", "damoncodes@gmail.com");
                customerParams.put("source", uToken);
                try {
                    Customer customer = Customer.create(customerParams);
                    System.out.println(customer);
                    // System.out.println(customer.sources.data[0].customer);
                    return new ResponseEntity<Customer>(customer, responseHeaders, HttpStatus.OK);
                    // return new ResponseEntity<String>(customer.sources.data[0].customer, responseHeaders, HttpStatus.OK);

                } catch (StripeException e) {
                    e.printStackTrace();
                    return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("payment", "", "Stripe Failue")).body(null);
                    // return new ResponseEntity<>("ERR", responseHeaders, HttpStatus.OK);

                }

            }
        }

        // return new ResponseEntity<>("AAA", responseHeaders, HttpStatus.OK);
        return  ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("payment", "", "Stripe Failure")).body(null);

    }
    /**
    * POST  /payments/pay : pay.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of payments in body
    */
    @RequestMapping(value = "/payments/pay",
    method = RequestMethod.PUT,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> payPayment(@Valid @RequestBody String ccData) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("MyResponseHeader", "MyValue");
        List<GlobalMetadata> globalMetadata = globalMetadataRepository.findAll();
        for(int i = 0; i < globalMetadata.size(); i++) {
            if(globalMetadata.get(i).getName().equals("test2")){
                String stripeApiKey = globalMetadata.get(i).getValue();
                String[] splitCC = ccData.split("#");
                String ccNumber = splitCC[0];
                log.debug("CHARGE PAYMENT", ccNumber);

                String ccMonth = splitCC[1].split(",")[0];
                String ccYear = splitCC[1].split(",")[1];

                RequestOptions requestOptions = (new RequestOptionsBuilder()).setApiKey(stripeApiKey).build();
                Map<String, Object> chargeMap = new HashMap<String, Object>();
                chargeMap.put("amount", Integer.parseInt(splitCC[2]));
                chargeMap.put("currency", "usd");
                Map<String, Object> cardMap = new HashMap<String, Object>();
                cardMap.put("number", ccNumber);
                // cardMap.put("capture", false);
                cardMap.put("exp_month", ccMonth);
                cardMap.put("exp_year", ccYear);
                chargeMap.put("card", cardMap);
                try {
                    Charge charge = Charge.create(chargeMap, requestOptions);
                    System.out.println(charge);
                    return new ResponseEntity<String>("PAYMENT SUCCESS", responseHeaders, HttpStatus.OK);
                } catch (StripeException e) {
                    e.printStackTrace();
                    return new ResponseEntity<String>("PAYMENT FAILURE", responseHeaders, HttpStatus.BAD_REQUEST);
                }


            }
        }




        responseHeaders.set("MyResponseHeader", "MyValue");
        return new ResponseEntity<String>("PAYMENT FAILURE", responseHeaders, HttpStatus.BAD_REQUEST);
    }
    /**
    * POST  /payments/pay : pay.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of payments in body
    */
    @RequestMapping(value = "/payments/auth",
    method = RequestMethod.PUT,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> authPayment(@Valid @RequestBody String ccData) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("MyResponseHeader", "MyValue");
        List<GlobalMetadata> globalMetadata = globalMetadataRepository.findAll();
        for(int i = 0; i < globalMetadata.size(); i++) {
            if(globalMetadata.get(i).getName().equals("test2")){
                String stripeApiKey = globalMetadata.get(i).getValue();
                String[] splitCC = ccData.split("#");
                String ccNumber = splitCC[0];
                log.debug("CHARGE PAYMENT", ccNumber);

                String ccMonth = splitCC[1].split(",")[0];
                String ccYear = splitCC[1].split(",")[1];

                RequestOptions requestOptions = (new RequestOptionsBuilder()).setApiKey(stripeApiKey).build();
                Map<String, Object> chargeMap = new HashMap<String, Object>();

                chargeMap.put("amount", Integer.parseInt(splitCC[2]));
                chargeMap.put("currency", "usd");

                Map<String, Object> cardMap = new HashMap<String, Object>();

                cardMap.put("number", ccNumber);
                // cardMap.put("capture", false);
                cardMap.put("exp_month", ccMonth);
                cardMap.put("exp_year", ccYear);

                // String[] splitString = paymentString.split("#");
                // String stripeUserToken = splitString[0];
                // String amount = splitString[1];
                Map<String, Object> chargeParams = new HashMap<String, Object>();
                chargeMap.put("card", cardMap);
                chargeParams.put("source", cardMap);
                chargeParams.put("amount", Integer.parseInt(splitCC[2]));
                chargeParams.put("currency", "usd");
                chargeParams.put("capture", false);

                try {
                    Charge charge = Charge.create(chargeParams, requestOptions);
                    System.out.println(charge);
                    return new ResponseEntity<String>("PAYMENT SUCCESS", responseHeaders, HttpStatus.OK);
                } catch (StripeException e) {
                    // e.printStackTrace();
                    System.out.println("EYO" + e.toString());
                    return new ResponseEntity<String>(e.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
                }


            }
        }




        responseHeaders.set("MyResponseHeader", "MyValue");
        return new ResponseEntity<String>("PAYMENT FAILURE", responseHeaders, HttpStatus.BAD_REQUEST);
    }
    /**
    * POST  /payments/charge : charge.
    *
    * @return the ResponseEntity with status 200 (OK) and the list of payments in body
    */
    @RequestMapping(value = "/payments/charge",
    method = RequestMethod.PUT,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> chargeCustomer(@Valid @RequestBody String paymentString) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("MyResponseHeader", "MyValue");
        List<GlobalMetadata> globalMetadata = globalMetadataRepository.findAll();
        for(int i = 0; i < globalMetadata.size(); i++) {
            if(globalMetadata.get(i).getName().equals("test2")){
                Stripe.apiKey = globalMetadata.get(i).getValue();

                String[] splitString = paymentString.split("#");
                String stripeUserToken = splitString[0];
                String amount = splitString[1];
                Map<String, Object> chargeParams = new HashMap<String, Object>();
                chargeParams.put("amount", amount);
                chargeParams.put("currency", "usd");
                chargeParams.put("capture", false);
                chargeParams.put("customer", stripeUserToken);
                RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(stripeUserToken).build();



                try {
                    Charge charge = Charge.create(chargeParams);
                    System.out.println(charge);
                    return new ResponseEntity<String>("PAYMENT SUCCESS", responseHeaders, HttpStatus.OK);
                } catch (StripeException e) {
                    e.printStackTrace();
                    return new ResponseEntity<String>("PAYMENT FAILURE", responseHeaders, HttpStatus.BAD_REQUEST);
                }
            }
        }
        responseHeaders.set("MyResponseHeader", "MyValue");
        return new ResponseEntity<String>("PAYMENT FAILURE", responseHeaders, HttpStatus.BAD_REQUEST);
    }

    /**
    * GET  /payments/:id : get the "id" payment.
    *
    * @param id the id of the payment to retrieve
    * @return the ResponseEntity with status 200 (OK) and with body the payment, or with status 404 (Not Found)
    */
    @RequestMapping(value = "/payments/{id}",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Payment> getPayment(@PathVariable Long id) {
        log.debug("REST request to get Payment : {}", id);
        Payment payment = paymentRepository.findOne(id);

        if (payment != null) {
            String decryptValue = transformData.transformFromSecure(payment.getCcdata());
            payment.setCcdata(decryptValue);
        }
        return Optional.ofNullable(payment)
        .map(result -> new ResponseEntity<>(
        result,
        HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
    * DELETE  /payments/:id : delete the "id" payment.
    *
    * @param id the id of the payment to delete
    * @return the ResponseEntity with status 200 (OK)
    */
    @RequestMapping(value = "/payments/{id}",
    method = RequestMethod.DELETE,
    produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        log.debug("REST request to delete Payment : {}", id);
        paymentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("payment", id.toString())).build();
    }

}
