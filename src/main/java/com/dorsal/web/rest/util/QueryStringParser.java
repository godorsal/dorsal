package com.dorsal.web.rest.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

/**
 * Created by rogerrut on 1/11/17.
 *
 * Utility class for parsing the query arguments passed into the Rest API's
 *
 */
public class QueryStringParser {

    private static String ARG_ATTRIBUTE = ":attribute:";
    private static String ARG_PRODUCT   = "product:";
    private static String ARG_SCORE     = ":score:";

    private static final Logger log = LoggerFactory.getLogger(QueryStringParser.class);


    /**
     * Extracts the products from the query string which has following format: product:MySQL,MariaDB:attribute:US-RESIDENT:score:2
     * @param query
     * @return ArrayList with values
     */
    public static List<String> getProductListFromQuery(String query) {
        int startIn = query.indexOf(ARG_PRODUCT);
        int endIn   = -1;
        List<String> productList = new ArrayList<String>();

        if (startIn > -1) {
            endIn = query.indexOf(ARG_ATTRIBUTE, startIn);
            StringTokenizer st = new StringTokenizer(query.substring(startIn + ARG_PRODUCT.length(), endIn), ",");

            while(st.hasMoreTokens())
            {
                productList.add(st.nextToken());
            }

            return productList;
        }
        else
        {
            return null;
        }
    }

    /**
     * Extracts the attributes from the query string which has following format: product:MySQL,MariaDB:attribute:US-RESIDENT:score:2
     * @param query
     * @return
     */
    public static List<String> getAttributeListFromQuery(String query) {
        int startIn = query.indexOf(ARG_ATTRIBUTE);
        int endIn   = -1;
        List<String> attributeList = new ArrayList<String>();

        if (startIn > -1) {
            endIn = query.indexOf(ARG_SCORE, startIn);
            StringTokenizer st = new StringTokenizer(query.substring(startIn + ARG_ATTRIBUTE.length(), endIn), ",");

            while(st.hasMoreTokens())
            {
                attributeList.add(st.nextToken());
            }

            return attributeList;
        }
        else
        {
            return null;
        }
    }

    /**
     *Extracts the score from the query string which has following format: product:MySQL,MariaDB:attribute:US-RESIDENT:score:2
     * @param query
     * @return
     */
    public static int getScoreFromQuery(String query) {
        int startIn = query.indexOf(ARG_SCORE);
        int endIn   = -1;
        int score = 2; // default

        try {
            if (startIn > -1) {
                if (startIn + ARG_SCORE.length() == query.length()) {
                    // No value specified use default
                    score = 2;
                } else {
                    // Convert
                    score = Integer.parseInt(query.substring(startIn + ARG_SCORE.length()));
                }
            }
        }catch (Exception e) {
            score = 2; //default
            log.warn("Exception while converting query param score string to integer. Exception: " +e);
        }

        return score;
    }
}
