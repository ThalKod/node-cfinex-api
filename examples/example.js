const cfinex = require("../node-cfinex-api");

cfinex.options({
    apikey: "<api key>",
    apisecret: "<api secret>",
});

// *********** Public api call

// Get markets
cfinex.getmarkets((re)=>{
    console.log("getmarkets()", re);
});

// Get all the open order / market(optionals)
cfinex.getAllOpenOrders({ market: "BTC-LTC" }, (re)=>{
    console.log("getAllOpenOrders()", re);
});

// Get ticks
cfinex.getTicks((re)=>{
    console.log("getTicks()", re);
});


// *********** Private api call

// Get the current balances
cfinex.getBalances((ret)=>{
    console.log("getBalances()", ret);
});

// Cancel an order
cfinex.cancelOrder({ uid: 229392002 }, (re)=>{
    console.log("cancelOrder()", re);
});

// Set a new order
cfinex.setNewOrder({ pair: "LTC-BTC", type: "Buy", amount: 1000, price: 0.00000001 }, (re)=>{
    console.log("setNewOrder()", re);
});

// Get your open orders
cfinex.getOpenOrders((re)=>{
    console.log("getOpenOrders", re);
});

// Get your accounts addresses
cfinex.getAccountAddresses((re)=>{
    console.log("getAccountAddresses()", re);
});

