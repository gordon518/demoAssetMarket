const express = require("express");
const router = express.Router();
var url = require("url");

/*
Convension over config, it's stupid to config every URL calls in router.
By this function, system will automatically process every URL requests, and dispatch requests to relevant processor in api folder.
For example: for the URL call of "/api/login", system will dispatch this call to the file of "/api/login.js".
By this convension, we can get rid of config of every URL calls.
*/
router.all("*",  (req, res) => {  // runs on ALL requests
    var pathname = url.parse(req.url).pathname;
    console.log("router() About to the URL Path of " + pathname);
    try {
        //dynamically load the js file base on the url path
        var handler = require("./api/" + pathname);
        //make sure we got a correct instantiation of the module
        //route to the right method in the module based on the HTTP action
        if(req.method.toLowerCase() == 'get' && typeof handler["get"] == 'function') {
            handler["get"](req, res);
            return;
        } else if (req.method.toLowerCase() == 'post' && typeof handler["post"] == 'function') {
            handler["post"](req, res);
            return;
        } else if (req.method.toLowerCase() == 'put' && typeof handler["put"] == 'function') {
            handler["put"](req, res);
            return;
        } else if (req.method.toLowerCase() == 'delete' && typeof handler["delete"] == 'function') {
            handler["delete"](req, res);
            return;
        }
    } catch(err) {
        console.log("router(): exception instantiating handler: " + err.stack);
    }
    console.log("router(): No request handler found for " + pathname);
    res.status(404).json({
        err: "router(): No request handler found for " + pathname
    })
});

module.exports = router;