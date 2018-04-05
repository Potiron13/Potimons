class ElementTypeEfficacy {
    constructor(damageTypeId, targetTypId, damageFactore) {
        this.damageTypeId = damageTypeId;
        this.targetTypId = targetTypId;
        this.damageFactore = damageFactore;
    }
}

function getAllElementTypeEfficacy(){
    $.get("api/potimon/typeEfficacity").then(function(a){
        AllElementTypeEfficacy = a;
    })
}

function getAllElementIdentifier(){    
    $.get("api/potimon/selectTypes").then(function(a){        
        AllTypes = a;
    })
}