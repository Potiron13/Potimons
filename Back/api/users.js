var express = require('express');
var router = express.Router();
var users = require('../database/models/users.js');

router.get('/insertUser', function(req, res) {
    users.insertUser(req.query).then(function(result){
        res.json(result);
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