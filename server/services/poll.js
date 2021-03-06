const WebSocket = require('ws')
const url = "wss://ws-feed.gdax.com"
var btc = require('../controllers/btcController')
const Btc = require("../models/btc");

var getFeed = function() {
    const subscribe = {
        type: "subscribe",
        channels: [{
            name: "ticker",
            product_ids: ["BTC-USD"]
        }]
    };

    var ws = new WebSocket(url);

    ws.onopen = () => {
        ws.send(JSON.stringify(subscribe));
    };

    ws.onerror = (error) => {
        console.log(`WebSocket error: ${error}`)
    };
    var iter = 0;

    ws.onmessage = e => {
        const value = JSON.parse(e.data);
        if (value.type !== "ticker") {
            return;
        }
        if (true) { /* for Test */
            // console.log("Update Price: " + value.price);
            var res = 0;
            let obj = {
                price: value.price,
                regdate: new Date(),
            };
            Btc.findOneAndUpdate({}, obj, { upsert: true }, function(err, doc) {
                if (err) { throw err; }
                // else { console.log("Updated"); }
            });

            iter++;
        } else {
            ws.close();
            console.log(`Finish`);
        }
    };
}

module.exports = getFeed;
