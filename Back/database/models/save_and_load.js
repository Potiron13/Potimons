const connection = require('../connection.js');

function saveGameInfo(data) {
    var con = connection.getConnection();
    var sql = "REPLACE INTO save_game_info (user_id, game_time, current_carte_id, potiflouz, potimon_capture) " + 
               "VALUES (" + data.userId + ", '" + data.gameTime + "', '" + data.currentCarteId + "', " + data.potiflouz + ", '" + data.potimonCapture + "');";         
                                
    return con.query(sql);
}

function loadGameInfo(data) {
    var con = connection.getConnection();
    var sql = "SELECT game_time, current_carte_id, potiflouz, potimon_capture FROM save_game_info " +
                "where user_id = " + data.userId;                            

    return con.query(sql);
}

function saveEquipe(data) {
    var con = connection.getConnection();
    var sql = "REPLACE INTO save_equipe (user_id, potimon_id, potimon_game_id, potimon_level, potimon_current_hp, potimon_current_mana, potimon_experience) " + 
               "VALUES (" + data.userId + ", " + data.potimonId +  ", '" + data.potimonGameId + "', " + data.potimonLevel + ", " + 
               data.potimonCurrentHp + ", " + data.potimonCurrentMana + ", " + data.potimonExperience + ");";                                                 
                                
    return con.query(sql);
}

function deleteEquipe(data) {
    var con = connection.getConnection();
    var sql = "DELETE FROM save_equipe WHERE user_id = " + data.userId;                                     
                                
    return con.query(sql);
}

function deleteReserve(data) {
    var con = connection.getConnection();
    var sql = "DELETE FROM save_reserve WHERE user_id = " + data.userId;                                     
                                
    return con.query(sql);
}

function deleteSkills(data) {
    var con = connection.getConnection();
    var sql = "DELETE FROM save_skills WHERE user_id = " + data.userId;                                     
                                
    return con.query(sql);
}

function saveSkills(data) {
    var con = connection.getConnection();
    var sql = "REPLACE INTO save_skills (potimon_game_id, skill_id, user_id) " + 
               "VALUES ('" + data.potimonGameId + "', " + data.skillId + ", " + data.userId + ");";                                                 
                            
    return con.query(sql);
}

function loadSkills(data) {
    var con = connection.getConnection();
    var sql = "SELECT save_skills.potimon_game_id, save_skills.skill_id FROM save_skills where save_skills.potimon_game_id = '" + data.potimonGameId + "'";                

    return con.query(sql);
}

function loadEquipe(data) {
    var con = connection.getConnection();     
    var sql = "SELECT save_equipe.potimon_id, save_equipe.potimon_game_id, save_equipe.potimon_level, save_equipe.potimon_current_hp, save_equipe.potimon_current_mana, " +  
                "save_equipe.potimon_experience FROM potimondb.save_equipe " +                 
                "where user_id = " + data.userId;            

    return con.query(sql);
}

function saveReserve(data) {
    var con = connection.getConnection();    
    var sql = "REPLACE INTO save_reserve (user_id, potimon_id, potimon_game_id, potimon_level, potimon_current_hp, potimon_current_mana, potimon_experience) " + 
               "VALUES (" + data.userId + ", " + data.potimonId + ", '" + data.potimonGameId + "', " + data.potimonLevel + ", " + 
               data.potimonCurrentHp + ", " + data.potimonCurrentMana + ", " + data.potimonExperience + ");";                                    
               
    return con.query(sql);
}

function loadReserve(data) {
    var con = connection.getConnection();
    var sql = "SELECT potimon_id, potimon_game_id, potimon_level, potimon_current_hp, potimon_current_mana," +
                " potimon_experience FROM save_reserve " +
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
    saveSkills,
    loadSkills,
    deleteEquipe,
    deleteReserve,
    deleteSkills,
}