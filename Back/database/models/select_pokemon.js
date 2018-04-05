const connection = require('../connection.js');

function selectPokemonStats(id) {    
    var con = connection.getConnection();
    var sql = "SELECT stats.identifier as stat, base_stat as value FROM potimondb.pokemon_stats " +
        "join stats on pokemon_stats.stat_id = stats.id " +
        "where pokemon_id = " + id;
    return con.query(sql);
}

function selectPokemonBaseExperience(id) {    
    var con = connection.getConnection();
    var sql = "SELECT pokemon.id, pokemon.identifier, pokemon.base_experience, pokemon.height from pokemon where id = " + id;
    return con.query(sql);
}

function selectPokemonMoves(id) {    
    var con = connection.getConnection();
    var sql = "SELECT moves.id, pokemon_moves.level FROM potimondb.pokemon_moves " +
        "join moves on pokemon_moves.move_id = moves.id " +
        "where pokemon_moves.pokemon_id = " + id + " and level > 0 and pokemon_moves.version_group_id = 1";
    return con.query(sql);
}

function selectPokemonTypes(id) {
    var con = connection.getConnection();
    var sql = "SELECT type_id FROM potimondb.pokemon_types where pokemon_id = " + id;
    return con.query(sql);
}

function selectPokemonEvolution(id) {    
    var con = connection.getConnection();
    var sql = "SELECT pokemon_species.id, pokemon_evolution.minimum_level FROM potimondb.pokemon_species " +
        "join  pokemon_evolution on pokemon_species.id = pokemon_evolution.evolved_species_id " +
        "where evolves_from_species_id = " + id;
    return con.query(sql);
}

function selectPokemonCaptureRate (id) {    
    var con = connection.getConnection();
    var sql = "SELECT capture_rate FROM potimondb.pokemon_species where id =  " + id;
    return con.query(sql);
}

function selectTypeEfficacy () {
    var con = connection.getConnection();
    var sql = "SELECT damage_type_id, target_type_id, damage_factor FROM potimondb.type_efficacy;";
    return con.query(sql);
}

function selectPotidexPotimon() {
    var con = connection.getConnection();
    var sql = "SELECT id, identifier FROM potimondb.pokemon;";
    return con.query(sql);
}

function selectTypes() {
    var con = connection.getConnection();
    var sql = "SELECT id, identifier FROM potimondb.types;";    
    
    return con.query(sql);
}

module.exports = {
    selectPokemonStats,
    selectPokemonBaseExperience,
    selectPokemonMoves,
    selectPokemonTypes,
    selectPokemonEvolution,
    selectPokemonCaptureRate,
    selectTypeEfficacy,
    selectPotidexPotimon,
    selectTypes,
}