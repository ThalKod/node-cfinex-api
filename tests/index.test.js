// TODO: Finalize test assertion...

const cfinex = require("../node-cfinex-api");

describe("Cfinex public API", ()=>{

   it("should respond with market data", (done)=>{
            cfinex.getMarkets((re)=>{
                // assert market response
                done();
            });
    });

    it("should get the open orders", (done)=>{
            cfinex.getAllOpenOrders({ market: "BTC-LTC" }, (re)=>{
                // assert open order response
                done();
            });
    });

    it("should respond with the ticks", (done)=>{
            cfinex.getTicks((re)=>{
                // asserts tick response
                done();
            });
    });
});


describe("Cfinex private API", ()=>{

    beforeEach(()=>{
        cfinex.options({
            apikey: "<api key>",
            apisecret: "<api secret>",
        });
    });

    it("should respond with current balances", (done)=>{
            cfinex.getBalances((ret)=>{
                // assert balance reponse
                done();
            });
     });

     it("should cancel the order", (done)=>{
            cfinex.cancelOrder({ uid: 229392002 }, (re)=>{
                // assert balance reponse
                done();
            });
     });

     it("should get the current open orders", (done)=>{
            cfinex.getOpenOrders((re)=>{
                // assert orders response
                done();
            });
     });

     it("should set new orders", (done)=>{
            cfinex.setNewOrder({ pair: "LTC-BTC", type: "Buy", amount: 1000, price: 0.0001 }, (re)=>{
                // assert new order resonse
                done();
            });
    });

    it("should get accounts addresses", (done)=>{
            cfinex.getAccountAddresses((re)=>{
                // assert accounts adresses
                done();
            });
    });
 });
