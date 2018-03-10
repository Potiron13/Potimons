const connection = require('../connection.js');

function saveGameInfo(data) {
    var con = connection.getConnection();
    var sql = "REPLACE INTO save_game_info (user_id, game_time, current_carte_id, potiflouz) " + 
               "VALUES (" + data.userId + ", '" + data.gameTime + "', '" + data.currentCarteId + "', " + data.potiflouz + ");";         
                                
    return con.query(sql);
}

function loadGameInfo(data) {
    var con = connection.getConnection();
    var sql = "SELECT game_time, current_carte_id, potiflouz FROM save_game_info " +
                "where user_id = " + data.userId;                            

    return con.query(sql);
}

function saveEquipe(data) {
    var con = connection.getConnection();
    var sql = "REPLACE INTO save_equipe (user_id, potimons_id, potimons_level, potimons_current_hp, potimons_current_mana, potimons_experience) " + 
               "VALUES (" + data.userId + ", '" + data.potimonsId + "', '" + data.potimonsLevel + "', '" + 
               data.potimonsCurrentHp + "', '" + data.potimonsCurrentMana + "', '" + data.potimonsExperience + "');";                                                 
                            
    return con.query(sql);
}

function loadEquipe(data) {
    var con = connection.getConnection();
    var sql = "SELECT potimons_id, potimons_level, potimons_current_hp, potimons_current_mana," +
                " potimons_experience FROM save_equipe " +
                "where user_id = " + data.userId;                

    return con.query(sql);
}

function saveReserve(data) {
    var con = connection.getConnection();    
    var sql = "REPLACE INTO save_reserve (user_id, potimons_id, potimons_level, potimons_current_hp, potimons_current_mana, potimons_experience) " + 
               "VALUES (" + data.userId + ", '" + data.potimonsId + "', '" + data.potimonsLevel + "', '" + 
               data.potimonsCurrentHp + "', '" + data.potimonsCurrentMana + "', '" + data.potimonsExperience + "');";                                    
               
    return con.query(sql);
}

function loadReserve(data) {
    var con = connection.getConnection();
    var sql = "SELECT potimons_id, potimons_level, potimons_current_hp, potimons_current_mana," +
                " potimons_experience FROM save_reserve " +
                "where user_id = " + data.userId;

    return con.query(sql);
}

function saveItem(data) {
    var con = connection.getConnection();    
    var sql = "REPLACE INTO save_item (user_id, items_name, quantities) " + 
               "VALUES (" + data.userId + ", '" + data.itemsName + "', '" + data.quantities + "');";                                                
            
    return con.query(sql);
}

function loadItem(data) {
    var con = connection.getConnection();
    var sql = "SELECT items_name, quantities FROM save_item " +
                "where user_id = " + data.userId;

    return con.query(sql);
}

module.exports = {
    saveEquipe,    
    loadEquipe,
    saveReserve,
    loadReserve,
    saveGameInfo,
    loadGameInfo,
    saveItem,
    loadItem,
}