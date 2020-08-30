"use strict";
exports.__esModule = true;
var express_1 = require("express");
var http = require('http');
var app = express_1["default"]();
app.use(express_1["default"].json());
var server = http.createServer(function (req, res) {
    app.get('/', function (req, res) {
        // try{ 
        res.status(200).json({ message: "fffffffffffffff" });
        // data:this.Game.serializeFrames(),
        // countActiveKeys : App.calculateChoices(currentScore)
        // })}catch(err){
        //     console.log(err);
        // } 
    });
});
server.listen(3000, '127.0.0.1', function () {
    console.log("Start Bowling Game Server");
});
