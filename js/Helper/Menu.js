function getSavesViewModels() {
    var savesViewModels = [];
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        savesViewModels.push(mapViewModelSaveFile(JSON.parse(localStorage.getItem( localStorage.key( i )))));
    }

    return savesViewModels;
}

function initialiserReserveMenu() {
    if ($('#modalMenuReserve').length) {
        $('#modalMenuReserve').empty();
    }
    var modalBody = creerReserveMenu('modalMenuReserve',  mapReserveViewModel(Equipe),  mapReserveViewModel(Reserve), 'Modifier Equipe')
}

function initialiserFusionTwoMonstersMenu() {
    if ($('#modalMenuFusionTwoMonsters').length) {
        $('#modalMenuFusionTwoMonsters').empty();
    }
    var modalBody = creerFusionTwoMonstersMenu('modalMenuFusionTwoMonsters',  mapReserveViewModel(Reserve), 'Fusionner deux monstres')
}

function initialiserSaveMenu() {
    var savesViewModels = getSavesViewModels();
    var modalBody = creerMenuDeSauvegarde('modalMenuSave', savesViewModels, 'Sauvegarder');
}

function initialiserMainMenu(Equipe) {
    if ($('#modalMenuStats').length) {
        $('#modalMenuStats').empty();
    }
    var modalBody = creerMenu('modalMenuStats', mapPlayerViewModel(Equipe), 'Statistiques' );
}

function initialiserFusionResultMenu(monster) {
    if ($('#modalMenuResultFusion').length) {
        $('#modalMenuResultFusion').empty();
    }
    var modalBody = creerFusionResultMenu('modalMenuResultFusion', new FusionViewModel(monster), 'Resultat de la fusion' );
}

function initialiserEvolutionMenu(monster) {
    if ($('#modalEvolution').length) {
        $('#modalEvolution').empty();
    }
    var modalBody = creerEvolutionMenu('modalEvolution', new EvolutionViewModel(monster), 'Resultat de l\'évolution' );
}

function initialiserSkillsMenu() {
    var modalId;
    $.each(Equipe, function(index) {
        modalId = 'modalSkills' + Equipe[index].id
        if ($('#' + modalId).length) {
            $('#' + modalId).empty();
        }
        var modalSkill = creerMenuSkills(modalId, mapSkillViewModel(Equipe[index].skills), 'Competences');
    });
}

function initialiserEquipementMenu(Equipe) {
    $.each(Equipe, function(index) {
        var modalEquipement = creerMenuEquipement('modalEquipement' + Equipe[index].id, Equipe[index].equipement, 'Equipement');
    });
}

function creerReserveMenu(idModal, viewModelsEquipe, viewModelsReserve, titre) {
    var modalBody = createModal(idModal, titre);
    displayReserveViewModels(idModal, viewModelsEquipe, viewModelsReserve, modalBody);
    return modalBody;
}

function creerFusionTwoMonstersMenu(idModal, viewModelsReserve, titre) {
    var modalBody = createModal(idModal, titre);
    displayFusionMonstersViewModels(idModal, viewModelsReserve, modalBody);
    return modalBody;
}

function creerFusionResultMenu(idModal, viewModel, titre) {
    var modalBody = createModal(idModal, titre);
    displayFusionResultMonstersViewModels(idModal, viewModel, modalBody);
    return modalBody;
}

function creerEvolutionMenu(idModal, viewModel, titre) {
    var modalBody = createModal(idModal, titre);
    displayEvolutionViewModels(idModal, viewModel, modalBody);
    return modalBody;
}

function creerMenuEquipement(idModal, viewModels, titre) {
    var modalBody = createModal(idModal, titre);
    displayEquipementViewModels(idModal, viewModels, modalBody, 'col-sm-2');
    return modalBody;
}

function creerMenuDeSauvegarde(idModal, saves, titre) {
    var modalBody = createModal(idModal, titre);
    var savingId;
    displaySaves(saves, modalBody, savingId, idModal);
    savingId = saves.length + 1;
    displayButtons ('Nouveau', 'BUTTON', function() {
        sauvegarder(localStorage.length + 1);
    }, modalBody);

    return modalBody;
}

function creerMenuDeChargement(idModal, loads, titre) {
    var modalBody = createModal(idModal, titre);
    var loadId;
    displayLoads(loads, modalBody, loadId, idModal);
    loadId = loads.length + 1;

    return modalBody;
}

function displayLoads(loads, modalBody, loadId, idModal){
    $.each(loads, function(index) {
        loadId = loads[index].find( x => x.dataType == 'saveId').value;
        var loadRow = displayElementOnParent('div', loadId, 'row saveRow', '', modalBody);
        displaySaveFileViewModels(idModal, loads[index], loadRow, 'Charger', function() {loadGame(loadRow.attr('id'))});
    });
}

function displaySaves(saves, modalBody, savingId, idModal){
    $.each(saves, function(index) {
        savingId = saves[index][saves[index].length-1].value;
        var saveRow = displayElementOnParent('div', savingId, 'row saveRow', '', modalBody);
        displaySaveFileViewModels(idModal, saves[index], saveRow, 'Sauvegarder'+savingId,function() {sauvegarder(saveRow.attr('id'))});
    });
}

function creerMenu(idModal, viewModels, titre) {
    var modalBody = createModal(idModal, titre);
    displayMenuViewModels(idModal, viewModels, modalBody, 'col-sm-1');
    return modalBody;
}

function creerMenuSkills(idModal, viewModels, titre) {
    var modalBody = createModal(idModal, titre);
    displaySkillsViewModels(idModal, viewModels, modalBody, 'col-sm-1');
    return modalBody;
}
