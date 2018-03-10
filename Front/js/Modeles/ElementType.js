class ElementTypeEfficacy {
    constructor(damageTypeId, targetTypId, damageFactore) {
        this.damageTypeId = damageTypeId;
        this.targetTypId = targetTypId;
        this.damageFactore = damageFactore;
    }
}

AllElementTypeEfficacy = [];

function getAllElementTypeEfficacy(){
    $.get("api/potimon/typeEfficacity").then(function(a){
        AllElementTypeEfficacy = a;
    })
}