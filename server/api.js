const express = require('express');
const zork = require('./zork');

var router = express.Router();

const session = null;

router.get('/status', (req, res) => {
    res.send({
        message: "api status"
    })
})

router.post('/start', (req, res) => {
    session = new zork.Session();
})

exports.router = router; 