var PotidexController = function (view, listMonstresCapture) {
    this.view = view;
    this.listMonstresCapture = listMonstresCapture;
};

PotidexController.prototype = {

    init: function() {
        this.view.render(this.getPotidexViewModels());
    },

    displayPotidex: function() {
        $('#' + strModalPotidex).modal();
    },

    getPotidexViewModels: function() {
        result = [];
        var controller = this;
        $.each(monsterList, function(index){
            var capture = (controller.listMonstresCapture.find(x=>x == this.name)) ? true : false;
            result.push(new ViewModelPotidex(this, capture))            
        });

        return result;
    },
}
