var express = require('express');
var router = express.Router();
var potimon = require('../database/models/select_pokemon.js');

router.get('/stats', function(req, res) {
    potimon.selectPokemonStats(req.query.id).then(function(result){
        res.json(result);
    })
});

router.get("/baseExperience", function(req, res) {
    potimon.selectPokemonBaseExperience(req.query.id).then(function(result){
        res.json(result);
    })
});

router.get("/moves", function(req, res) {
    potimon.selectPokemonMoves(req.query.id).then(function(result){
        res.json(result);
    });
});

router.get("/types", function(req, res) {
    potimon.selectPokemonTypes(req.query.id).then(function(result){
        res.json(result);
    });
});

router.get("/evolution", function(req, res) {
    potimon.selectPokemonEvolution(req.query.id).then(function(result){
        res.json(result);
    });
});

router.get("/captureRate", function(req, res) {
    potimon.selectPokemonCaptureRate(req.query.id).then(function(result){
        res.json(result);
    });
});

router.get("/typeEfficacity", function(req, res) {
    potimon.selectTypeEfficacy().then(function(result){
        res.json(result);
    });
});

module.exports = router;