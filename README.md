# Node Cfinex API
Node Cfinex API is an asynchronous node.js library designed to help you make your own projects that interact with the [CFINEX API](https://cfinex.com).

#### Installation
```
npm install node-cfinex-api --save
```
#### Getting started
```javascript
const cfinex = require("../node-cfinex-api")().options({
    apikey: "<api key>",
    apisecret: "<api secret>",
});
```

#### Instantiating Multiple Instances
```javascript
const cfinex = require('node-binance-api');

const instance1 = cfinex.createInstance({
    //
});

const instance2 = cfinex.createInstance({
    //
});
```

#### Getting Markets
```javascript
cfinex.getMarkets((re)=>{
    console.log("getmarkets()", re);
});
```
<details>
 <summary>View Response</summary>

```js
{  }
// Response
```
</details>

#### Getting All Open Orders
```javascript
cfinex.getAllOpenOrders({ market: "BTC-LTC" }, (re)=>{
    console.log("getAllOpenOrders()", re);
});
```
<details>
 <summary>View Response</summary>

```js
{  }
// Response
```
</details>

#### Getting Markets Ticks
```javascript
cfinex.getTicks((re)=>{
    console.log("getTicks()", re);
});
```
<details>
 <summary>View Response</summary>

```js
{  }
// Response
```
</details>

#### Getting current balances
```javascript
cfinex.getBalances((ret)=>{
    console.log("getBalances()", ret);
});
```
<details>
 <summary>View Response</summary>

```js
{  }
// Response
```
</details>

#### Cancel an open orders
```javascript
cfinex.cancelOrder({ uid: 229392002 }, (re)=>{
    console.log("cancelOrder()", re);
});
```
<details>
 <summary>View Response</summary>

```js
{  }
// Response
```
</details>

#### Set a new Orders
```javascript
cfinex.setNewOrder({ pair: "LTC-BTC", type: "Buy", amount: 1000, price: 0.0001 }, (re)=>{
    console.log("setNewOrder()", re);
});
```
<details>
 <summary>View Response</summary>

```js
{  }
// Response
```
</details>

#### Get User open orders
```javascript
cfinex.getOpenOrders((re)=>{
    console.log("getOpenOrders", re);
});
```
<details>
 <summary>View Response</summary>

```js
{  }
// Response
```
</details>

#### Get account addresses
```javascript
cfinex.getAccountAddresses((re)=>{
    console.log("getAccountAddresses()", re);
});
```
<details>
 <summary>View Response</summary>

```js
{  }
// Response
```
</details>