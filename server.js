const express = require('express');
const app = express();
const longpoll = require("express-longpoll")(app);
const path = require("path")
const bodyParser = require("body-parser")
app.use(express.static(path.join(__dirname, "klient")))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Creates app.get("/poll") for the long poll
longpoll.create("/poll");




// Publishes data to all clients long polling /poll endpoint
// You need to call this AFTER you make a GET request to /poll

// Publish every 5 seconds
// setInterval(function () { 
//     longpoll.publish("/poll", data);
// }, 5000);

app.post('/send', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.body)
  longpoll.publish("/poll", req.body)
  res.send("POST Request Called")
})

app.listen(3000, function () {
  console.log("Listening on port 3000");
});