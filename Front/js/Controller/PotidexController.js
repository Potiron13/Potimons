var PotidexController = function (view) {
    this.view = view;    
};

PotidexController.prototype = {

    init: function() {
        var controller = this;
        $.get("/api/potimon/potimonPotidex").then(function(potimonPotidex){ 
            SetPotidexMonstres(potimonPotidex);               
            controller.view.render(controller.handlePotimonCapture(potimonPotidex));
        });
            
    },

    displayPotidex: function() {
        this.view.render(this.handlePotimonCapture(GetPotidexMonstres()));
        $('#' + strModalPotidex).modal();
    },

    handlePotimonCapture: function(potimonPotidex) {
        var result = [];
        var potimonCapture = GetMonstresCapture();
        $.each(potimonPotidex, function(index){
            var capture = (potimonCapture.find(x=>x == this.id)) ? true : false;                
            result.push(new ViewModelPotidex(this, capture))
        });
        return result;
    },
}
