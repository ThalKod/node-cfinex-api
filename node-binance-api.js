/* ============================================================
 * node-cfinex-api
 *
 * ============================================================
 * Copyright 2018-, ThalKod
 * Released under the MIT License
 * ============================================================ */

 let api = function cfinex(){
    const request = require("request");

    const defaultRequestOptions = {
        method: "GET",
        agent: false,
        headers: {
          "User-Agent": "Mozilla/4.0 (compatible; Node CFINEX API)",
          "Content-type": "application/x-www-form-urlencoded",
        },
      };

      const opts = {
        baseUrl: "http://cfinex.com/",
        apikey: "APIKEY",
        apisecret: "APISECRET",
      };
 };


 module.exports = api;
