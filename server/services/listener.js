const WebSocket = require('ws')
const url = "ws://server"
const port = 8080
var btc = require('../controllers/btcController')
const Btc = require("../models/btc");

const http = require('http');

var respondClient = function() {
    const subscribe = {
        type: "subscribe",
        channels: [{
            name: "ticker",
            product_ids: ["BTC-USD"]
        }]
    };

    var ws = new WebSocket.Server({ port: port });
    var id = 0;
    ws.on('connection', function connection(ws, request, client) {
        ws.on('message', function incoming(message) {
            // console.log('received: %s', message);

            const value = JSON.parse(message);
            // console.log(value);
            if (value.type !== "subscribe") {
                return;
            }
            var msg = {};

            Btc.find().limit(1)
                .then(item => {
                    // console.log('------ Send: ' + item);
                    const msg = { type: "ticker", price: item[0].price, regdate: item[0].regdate };
                    ws.send(JSON.stringify(msg));
                })
                .catch(err => {
                    msg = err.message || "Some error occurred while retrieving btcs."
                    console.log(msg);
                });
        });


        ws.on('close', function() {
            console.log('stopping client interval');
        });

    });

    ws.onerror = (error) => {
        console.log(`WebSocket error: ${error}`)
    };
}

module.exports = respondClient;