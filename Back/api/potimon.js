var express = require('express');
var router = express.Router();
var potimon = require('../database/models/select_pokemon.js');

router.get('/stats', function(req, res) {
    potimon.getPokemonStats(req.query.id, function(err, result){
        res.json(result);
    });
});

router.get("/baseExperience", function(req, res) {
    potimon.getPokemonBaseExperience(req.query.id, function(err, result){
        res.json(result);
    });
});

router.get("/moves", function(req, res) {
    potimon.getPokemonMoves(req.query.id, function(err, result){
        res.json(result);
    });
});

module.exports = router;