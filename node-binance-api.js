/* ============================================================
 * node-cfinex-api
 *
 * ============================================================
 * Copyright 2018-, ThalKod
 * Released under the MIT License
 * ============================================================ */

 let api = function cfinex(options){
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

  const getNonce = ()=>{
    let nonce = new Date().getTime();

    while(lastNonces.indexOf(nonce) > -1) {
      nonce = new Date().getTime();
    }

    lastNonces = lastNonces.slice(-50);

    lastNonces.push(nonce);

    return nonce;
  };

  const extractOptions = (options)=>{
    const o = Object.keys(options);

    for(let i = 0; i < o.length; i++) {
      opts[o[i]] = options[o[i]];
    }
  };

  if(options) {
    extractOptions(options);
  }

  const apiCredentials = (uri)=>{
    const opt = {
      apikey: opts.apikey,
      nonce: getNonce(),
    };

    return setRequestUriGetParams(uri, opt);
  };

  const setRequestUriGetParams = (uri, options)=>{
    let op;
    if(typeof (uri) === "object"){
      op = uri;
      uri = op.uri;
    }else{
      op = assign({}, defaultRequestOptions);
    }


    const o = Object.keys(options);

    for(let i = 0; i < o.length; i++) {
      uri = updateQueryStringParameter(uri, o[i], options[o[i]]);
    }

    op.headers.apisign = sha512.hmac(uri, opts.apisecret); // setting the HMAC hash `apisign` http header
    op.uri = uri;
    // op.timeout = opts.requestTimeoutInSeconds * 1000;

    return op;
  };

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


  const publicApiCall = (url, callback, options)=>{
    const op = assign({}, defaultRequestOptions);
    if(!options) {
      op.uri = url;
    }
    sendRequestCallback(callback, (!options) ? op : setRequestUriGetParams(url, options));
  };

  const credentialApiCall = (url, callback, options)=>{
    if(options) {
      options = setRequestUriGetParams(apiCredentials(url), options);
    }
    sendRequestCallback(callback, options);
  };


 };


 module.exports = api;
