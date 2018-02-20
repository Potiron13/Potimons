
function initialiserEvolutionMenu(monster) {
    var idModal = 'modalEvolution' + monster.id;
    if ($('#' + idModal).length) {
        $('#' + idModal).empty();
    }
    var viewModel = new EvolutionViewModel(monster);
    var parent = createModal(idModal, 'Resultat de l\'evolution');
    var rowLabel = displayElementOnParent('div', 'Label' + viewModel.id + idModal, 'row', '', parent);
    var rowValue = displayElementOnParent('div', 'Value' + viewModel.id + idModal , 'row', '', parent);
    $.each(viewModel, function(label, value) {
        if (label != 'id') {
            if (label != 'src') {
                displayElementOnParent('div', label + 'Label' + viewModel.id, 'col-sm-2', label, rowLabel);
                displayElementOnParent('div', label + 'Value' + viewModel.id, 'col-sm-2', value, rowValue);
            }else {
                var colImg = displayElementOnParent('div', label + 'Value' + viewModel.id, 'col-sm-2', '', rowValue);
                console.log(colImg);
                var playerImg = document.createElement('img');
                playerImg.src = value;
                colImg.append(playerImg);
            }
        }
    });
    $('#' + idModal).modal();
}

function creerEvolutionMenu(idModal, viewModel, titre) {
    var modalBody = createModal(idModal, titre);
    displayEvolutionViewModels(idModal, viewModel, modalBody);
    return modalBody;
}

function displayEvoltionResult(){
    $('#modalEvolution').modal();
}
