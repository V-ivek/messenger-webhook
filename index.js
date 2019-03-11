'use strict';

//imports dependencies and setup http server
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json());

app.listen(process.env.PORT || 1337, () => {
    console.log("webhook is listesning")
});

app.post('/webhook',(req,res)=>{
    let body = req.body;

    //Check this is an event from a page subscription
    if (body.object === 'page') {
        //Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
        res.status(200).send('EVENT_RECIEVED');
    } else {
        res.sendStatus(404);
    }
});

app.get('/webhook', (req,res)=>{
    let VERIFY_TOKEN = "EAAF0IK8pFhcBABwGbehhBMSjg91DbinPO4ttoZBrcucX0LaL0LGtUoc8TiIUj6UAiEfICtcr8ZC1xGzoLEVevL7iD98QUeX70VR5MBpOY8oUN2otxPkXyfPolQxVo89DJJRVrJgUBZCeJaK2Du758yT1W8UQZBhoFsuJSsGkrgZDZD";
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    //Check if a token and mode is in the query string of the request
    if (mode && token) {
        
        //Responds with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
        
    } else {
        res.sendStatus(403);
    }
});

app.get('/',(req,res)=> {
    res.status(200).send("Welcome to Bot47");
})