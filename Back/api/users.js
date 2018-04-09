var express = require('express');
var router = express.Router();
var users = require('../database/models/users.js');
var mailer = require('../mailer.js');

router.get('/insertUser', function(req, res) {
    users.insertUser(req.query).then(function(result){
        res.json(result);        
        mailer.sendMail(req.query.email);
    }).catch(function(error) {
        res.status(500).send("Pseudo ou email non valide/existant.")    
    });
});

router.get('/selectUser', function(req, res) {
    users.selectUser(req.query).then(function(result){
        res.json(result);
    })
});

module.exports = router;