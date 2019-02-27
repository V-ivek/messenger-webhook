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
    console.log("Tcasd")
    let VERIFY_TOKEN = "EAAF0IK8pFhcBAKtJw8flgA9LuAZAsXEYHaZAnixYlzBf5tTuTFXX7V5upZCsLdxOY9s9AaO8nNiUUn1nv3iW07CcGmdZAW3XGxW3hdI8WALfZBZA55uqMfMH7U0JZBnObizwrOH4Smxz9074ntqMrsuo2P15hzCP5CExiS8mIEG0AZDZD";
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