var PotidexView = function () {

};

PotidexView.prototype = {

    render: function(viewModels) {
        var idModal = strModalPotidex;
        var view = this;
        var colClass = 'col-sm-2';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, 'Potidex');
        var container = displayElementOnParent('div', 'potidexContainer', 'container', '', parent);
        var potidexRow = displayElementOnParent('div', 'potidexRow', 'row', '', container);
        $.each(viewModels, function(index) {
            var monsterCol = displayElementOnParent('div', 'monsterCol' + this.name, 'col-sm-2', '', potidexRow);
            var monsterImg = document.createElement('img');
            $(monsterImg).css({
                'height' : '3em'
            })
            if (this.capture) {
                monsterImg.src = this.src;
                monsterCol.append(monsterImg);
                monsterImg.setAttribute('data-toggle', 'tooltip');
                monsterImg.setAttribute('title', this.name);
                $(monsterImg).on('click', function(){
                    view.renderMonsterDetail(viewModels[index]);
                });
            }else {
                monsterImg.src = 'Images/Ui/questionMark.png';
                monsterCol.append(monsterImg);
            }
        });
    },

    renderMonsterDetail: function(viewModel) {
        var idModal = strModalDetailPotidex;
        var view = this;
        var colClass = 'col-sm-2';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, viewModel.name);
        var container = displayElementOnParent('div', 'potidexDetailContainer', 'container', '', parent);
        var potidexRow = displayElementOnParent('div', 'potidexDetailRow', 'row', '', container);
        var monsterImgCol = displayElementOnParent('div', 'monsterImgDetailCol' + this.name, 'col-sm-12', '', potidexRow);
        var monsterImg = document.createElement('img');
        monsterImg.src = viewModel.src;
        monsterImg.style = 'height : 10em';
        monsterImgCol.append(monsterImg);
        var monsterDescriptionCol = displayElementOnParent('div', 'monsterDescriptionCol' + viewModel.name, 'col-sm-12', viewModel.description, potidexRow);
        $('#' + idModal).modal();
    }
}
