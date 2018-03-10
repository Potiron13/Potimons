
function getPotimonById(id) {
    return $.when(
        $.get("/api/potimon/baseExperience", {id : id}), 
        $.get("/api/potimon/stats", {id : id}), 
        $.get("/api/potimon/moves", {id : id}),
        $.get("/api/potimon/types", {id : id}),
        $.get("/api/potimon/evolution", {id : id}),
        $.get("/api/potimon/captureRate", {id : id})
    ).then(function(a1, a2, a3, a4, a5, a6){
        return formatPotimonData(a1, a2, a3, a4, a5, a6);
    });
}

function formatPotimonData(a1, a2, a3, a4, a5, a6){
    result = {};
    result.baseExperience = a1[0];
    result.stats = a2[0];
    result.moves = a3[0];
    result.types = a4[0];
    result.evolution = a5[0];
    result.captureRate = a6[0];    

    return result
}