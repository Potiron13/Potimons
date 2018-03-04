
function getPotimonById(id) {
    $.when(
        $.get("/api/potimon/baseExperience", {id : id}), 
        $.get("/api/potimon/stats", {id : id}), 
        $.get("/api/potimon/moves", {id : id})
    ).then(function(a1, a2, a3){
        result = {};
        result.baseExperience = a1[0];
        result.stats = a2[0];
        result.moves = a3[0];
        console.log(result)

        return result
    });
}