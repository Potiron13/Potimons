function selectPokemonStats(id, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "potimonDb"
    });
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT stats.identifier as stat, base_stat as value FROM potimondb.pokemon_stats " +
        "join stats on pokemon_stats.stat_id = stats.id " +
        "where pokemon_id = " + id;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            callback(err, result);
        });        
    });
}

function selectPokemonBaseExperience(id, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "potimonDb"
    });
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT pokemon.id, pokemon.identifier, pokemon.base_experience from pokemon where id = " + id;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            callback(err, result);
        });
    });
}

function selectPokemonMoves(id, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "potimonDb"
    });
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT moves.identifier, moves.power, pokemon_moves.level FROM potimondb.pokemon_moves " +
            "join moves on pokemon_moves.move_id = moves.id " +
            "where pokemon_moves.pokemon_id = " + id + " and level > 0 and pokemon_moves.version_group_id = 1";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            callback(err, result);
        });
    });
}

module.exports = {
    getPokemonStats: function(id, callback) {
        selectPokemonStats(id, function(err, result){
            callback(err, result);
        });
    },

    getPokemonBaseExperience: function(id, callback) {
        selectPokemonBaseExperience(id, function(err, result){
            callback(err, result);
        });
    },
    
    getPokemonMoves: function(id, callback) {
        selectPokemonMoves(id, function(err, result){
            callback(err, result);
        });
    },
}