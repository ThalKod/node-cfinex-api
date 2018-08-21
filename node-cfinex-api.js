/* ============================================================
 * node-cfinex-api
 * ============================================================
 * Released under the MIT License
 * ============================================================ */

 /**
 * Node Cfinex API
 * @module Thalkod/node-cfinex-api
 * @return {object} instance to class object
 */
 const api = (options)=>{
  const request = require("request");
  const assign = require("object-assign");
  const sha512 = require("js-sha512");


  const defaultRequestOptions = {
    method: "GET",
    agent: false,
    headers: {
      "User-Agent": "Mozilla/4.0 (compatible; Node CFINEX API)",
      "Content-type": "application/x-www-form-urlencoded",
    },
  };

  const opts = {
    baseUrl: "https://cfinex.com/api?",
    apikey: "APIKEY",
    apisecret: "APISECRET",
  };

  let lastNonces = [];

  /**
     * Get the current timestamp
     * @return {integer} current timestamp
     */
  const getNonce = ()=>{
    let nonce = new Date().getTime();

    while(lastNonces.indexOf(nonce) > -1) {
      nonce = new Date().getTime();
    }

    lastNonces = lastNonces.slice(-50);

    lastNonces.push(nonce);

    return nonce;
  };

  /**
     * Extract list of options
     * @param {object} options - list of options
     */
  const extractOptions = (options)=>{
    const o = Object.keys(options);

    for(let i = 0; i < o.length; i++) {
      opts[o[i]] = options[o[i]];
    }
  };

  if(options) {
    extractOptions(options);
  }

  /**
    * Setup API Credentials
    * @param {string} uri - uri address
    * @return {object} modified options
    */
  const apiCredentials = (uri)=>{
    const opt = {
      apikey: opts.apikey,
      nonce: getNonce(),
    };

    return setRequestUriGetParams(uri, opt);
  };

  /**
     * Set params request in uri
     * @param {string/object} uri - uri
     * @param {object} connString - options list
     * @param {boolean} priv - is private api call ?
     * @return {object} modified options
     */
  const setRequestUriGetParams = (uri, options, priv = false)=>{
    let op;
    if(typeof (uri) === "object"){
      op = uri;
      uri = op.uri;
    }else{
      op = assign({}, defaultRequestOptions);
      if(options.apikey) op.method = "POST";
    }

    // console.log("OPTONS :", options);

    if(!options.apikey && !priv){
      const o = Object.keys(options);

      for(let i = 0; i < o.length; i++) {
        uri = updateQueryStringParameter(uri, o[i], options[o[i]]);
      }
    }

    op.uri = uri;

    return op;
  };

  /**
     * Update the querry parameters
     * @param {string} uri - uri
     * @param {string} key - defined key
     * @param {string} value - value of the key
     * @return {string} modified uri
     */
  const updateQueryStringParameter = (uri, key, value)=>{
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf("?") !== -1 ? "&" : "?";

    if(uri.match(re)) {
      uri = uri.replace(re, "$1" + key + "=" + value + "$2");
    }else{
      uri = uri + separator + key + "=" + value;
    }

    return uri;
  };


  const sendRequestCallback = (callback, op)=>{

    request(op, (error, result, body)=>{
      if(!body || !result || result.statusCode !== 200) {

        const errorObj = {
          success: false,
          message: "request error",
          error,
          result,
        };

        return callback(errorObj);
      }else{
        try {
          result = JSON.parse(body);
        } catch (err) {}
        if(!result || !result.success) {
          // error returned by Cfinex API - forward the result as an error
          return callback(result);
        }
        return callback(result);
      }
    });
  };

  /**
     * Set up public api call
     * @param {string} url - the url
     * @param {function} function - callback function
     * @param {object} options - the options
     */
  const publicApiCall = (url, callback, options)=>{
    const op = assign({}, defaultRequestOptions);
    if(!options) {
      op.uri = url;
    }
    sendRequestCallback(callback, (!options) ? op : setRequestUriGetParams(url, options));
  };

  /**
     * Add the post data
     * @param {object} pre - the key to setup
     * @param {object} options - the options
     * @returns {object} options - modified options
     */
  const addPostData = (pre, options)=>{
    options.form = {
      api: "private",
      apikey: opts.apikey,
      nonce: getNonce(),
      ...pre,
    };

    const o = Object.keys(pre);
    let temp = "";
      for(let i = 0; i < o.length; i++) {
        temp += updateQueryStringParameter("", o[i], pre[o[i]]);
      }
    const data = temp.substr(1);
    const encryptedData = sha512.hmac(opts.apisecret, data);
    options.form = {
      data: encryptedData,
    };

    return options;
  };

  /**
     * Set up private api call
     * @param {string} url - the url
     * @param {function} function - callback function
     * @param {object} options - the options
     */
  const privateApiCall = (url, callback, options)=>{
    let pre = {};
    if(options) {
      pre = options;
      options = setRequestUriGetParams(apiCredentials(url), options, true);
    }
    const fullOptions = addPostData(pre, options);
    sendRequestCallback(callback, fullOptions);
  };

  return {
    /**
     * Set options
     * @param {object} options - The api otpions
     */
    options: (options)=>{
      extractOptions(options);
    },

    /**
     * Getting Markets
     * @param {function} callback - callback function
     */
    getMarkets: (callback)=>{
      publicApiCall(opts.baseUrl + "api=public", callback, { method: "markets" });
    },

    /**
     * Get all the open order
     * @param {object} options - the options
     * @param {function} callback - callback function
     */
    getAllOpenOrders: (options, callback)=>{
      publicApiCall(opts.baseUrl + "api=public", callback, { method: "OpenOrders", ...options });
    },

    /**
     * Get markets tick
     * @param {function} callback - callback function
     */
    getTicks: (callback)=>{
      publicApiCall(opts.baseUrl + "api=public", callback, { method: "tickerapi" });
    },

    /**
     * Get current balances
     * @param {function} callback - callback function
     */
    getBalances: (callback)=>{
      privateApiCall(opts.baseUrl, callback, { method: "balances" });
    },

    /**
     * Get private open order
     * @param {function} callback - callback function
     */
    getOpenOrders: (callback)=>{
      privateApiCall(opts.baseUrl, callback, { method: "openOrders" });
    },

    /**
     * Set New Order
     * @param {object} options - the options
     * @param {function} callback - callback function
     */
    setNewOrder: (options, callback)=>{
      privateApiCall(opts.baseUrl, callback, { method: "order", ...options });
    },

    /**
     * Cancel an order
     * @param {object} options - the options
     * @param {function} callback - callback function
     */
    cancelOrder: (options, callback)=>{
      privateApiCall(opts.baseUrl, callback, { method: "orderCancel", ...options });
    },

    /**
     * Get the accounts addresses
     * @param {object} options - the options
     * @param {function} callback - callback function
     */
    getAccountAddresses: (callback)=>{
      privateApiCall(opts.baseUrl, callback, { method: "addresses", ...options });
    },
  };
 };


 module.exports = api();
