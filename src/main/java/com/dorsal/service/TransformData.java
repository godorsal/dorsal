package com.dorsal.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service to transform (encrypt/decrypt) strings in a secure way
 */
@Service
public class TransformData {
    private final Logger log = LoggerFactory.getLogger(TransformData.class);

    /** The xchars. */
    private static char[] xchars = { 0xA5, 0xD2, 0x69, 0xB4, 0x5A, 0x2D, 0x96, 0x4B, 0 };

    /** The echars. */
    private static char[] echars = { 'n', 'b', 'T', 'F', 'm', 'H', 's', 'a', 'L', 'd', 'J', 'i', 'Y', 'V', 'R', 'w' };

    /** The reverse structure */
    private static char[] reverse = new char[256];

    /**
     * Constructor that initializes the array for decrypting the strings
     */
    public TransformData() {
        // Initialize data structure
        int i;
        for (i = 256; --i >= 0;) {
            // First, fill the entire array with invalid values,
            // to detect any inappropriate incoming values.
            reverse[i] = 0x00ff;
        }

        for (i = echars.length; --i >= 0;) {
            // Then populate the positions we actually care about.
            reverse[echars[i]] = (char) i;
        }
    }

    /**
     * Takes an incoming string and encrypts it to a string value with valid characters. Simplifies storage of data not
     * being concerned about special characters.
     * @param clearText
     * @return encrypted input value
     */

    public String transformToSecure(String clearText) {
        String encrypted = "";

        // Do the magic
        int len = clearText.length();
        int bufferLength = len * 2;
        char[] str = clearText.toCharArray();
        char[] buf = new char[bufferLength];
        int s;
        int x = 0;
        for (s = 0; s < len; ++s) {
            str[s] = (char) ((str[s] += str[s] << 4) ^ xchars[x++]);
            if (xchars[x] == 0)
                x = 0;
        }
        for (s = len - 1; --s >= 0;) {
            str[s] += str[s + 1];
        }
        for (s = 1; s < len; ++s) {
            str[s] += str[s - 1];
        }
        int l = len;
        int h = bufferLength;
        for (s = len; --s >= 0;) {
            buf[--l] = echars[str[s] & 0x000f];
            buf[--h] = echars[(str[s] & 0x00f0) >> 4];
        }

        return new String(buf);

    }

    /**
     * Decrypts input value to clear text value
     * @param encrypted
     * @return
     */
    public String transformFromSecure (String encrypted) {

        // Do the magic
        int bufferLength = encrypted.length();
        int len = bufferLength / 2;
        if (len * 2 != bufferLength) {
            log.error("Transform From Secure string [" + encrypted + "] failed. Not valid characters used!");
            return "";
        }

        char[] buf = encrypted.toCharArray();
        char[] str = new char[len];
        int s;
        int l = len;
        int h = bufferLength;
        for (s = len; --s >= 0;) {
            char hi = reverse[buf[--h]];
            char lo = reverse[buf[--l]];
            if (hi == 0x00ff || lo == 0x00ff) {
                log.error("Transform From Secure string [" + encrypted + "] failed. Not valid characters used!");
                return "";
            }
            str[s] = (char) ((hi << 4) + lo);
        }

        for (s = len - 1; --s >= 0;) {
            str[s + 1] -= str[s];
        }
        for (s = 1; s < len; ++s) {
            str[s - 1] -= str[s];
        }

        int x = 0;
        for (s = 0; s < len; ++s) {
            str[s] ^= xchars[x++];
            str[s] -= str[s] << 4;
            str[s] &= 0x00ff;
            if (xchars[x] == 0) {
                x = 0;
            }
        }
        return new String(str);
    }
}
