var express = require('express');
var router = express.Router();
var users = require('../database/models/users.js');
var mailer = require('../mailer.js');

router.get('/insertUser', function (req, res) {
    users.insertUser(req.query).then(function (result) {
        res.json(result);
        mailer.sendMailWithToken(req.query.email, req.query.guidToken, req.headers.host);   
    }).catch(function (error) {
        res.status(500).send("Pseudo ou email non valide/existant.")
    });
});

router.get('/selectUser', function (req, res) {
    users.selectUser(req.query).then(function (result) {
        res.json(result);
    })
});

router.get('/activateAccount', function (req, res) {
    users.activateAccount(req.query).then(function (result) {
        res.redirect('/');
    })
});

module.exports = router;