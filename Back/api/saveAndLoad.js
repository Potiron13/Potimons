var express = require('express');
var router = express.Router();
var saveAndLoad = require('../database/models/save_and_load.js');

router.get('/saveGameInfo', function(req, res) {
    saveAndLoad.saveGameInfo(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/loadGameInfo', function(req, res) {
    saveAndLoad.loadGameInfo(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/saveEquipe', function(req, res) {
    saveAndLoad.saveEquipe(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/loadEquipe', function(req, res) {
    saveAndLoad.loadEquipe(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/deleteEquipe', function(req, res) {
    saveAndLoad.deleteEquipe(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/deleteReserve', function(req, res) {
    saveAndLoad.deleteReserve(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/deleteSkills', function(req, res) {
    saveAndLoad.deleteSkills(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/saveSkills', function(req, res) {
    saveAndLoad.saveSkills(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/loadSkills', function(req, res) {
    saveAndLoad.loadSkills(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/saveReserve', function(req, res) {
    saveAndLoad.saveReserve(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/loadReserve', function(req, res) {
    saveAndLoad.loadReserve(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/saveItem', function(req, res) {
    saveAndLoad.saveItem(req.query).then(function(result){
        res.json(result);
    })
});

router.get('/loadItem', function(req, res) {
    saveAndLoad.loadItem(req.query).then(function(result){
        res.json(result);
    })
});

module.exports = router;