
var StartingScreenController = function (view, listReserve, listItem, listCarte, timeGame, listMonstresCapture, listUser) {
    this.view = view;    
    this.listItem = listItem;
    this.listReserve = listReserve;
    this.listCarte = listCarte;
    this.timeGame = timeGame;
    this.listUser = listUser;
    this.userId;
    this.listMonstresCapture = listMonstresCapture;
    this.worldMapController = new WorldMapController(new WorldMapView(), this.listReserve, this.listItem, this.listCarte, this.timeGame, this.listMonstresCapture);
    this.StarterChoiceController = new StarterChoiceController(new StarterChoiceView());
};

StartingScreenController.prototype = {

    init: function () {
        this.view.newUser = this.newUser.bind(this);
        this.view.logIn = this.logIn.bind(this);
        this.view.render();
        getAllElementTypeEfficacy();
        getAllElementIdentifier();
    },

    newGame: function () {
        this.StarterChoiceController.init(this.newGameInit.bind(this));
    },

    newGameInit: function (potimon) {
        var controller = this;
        var startingPotion = cloneItem(fetchItem('smallPotion'));
        startingPotion.quantity = 5;
        var startingPotiball = cloneItem(fetchItem(strPotiball));
        startingPotiball.quantity = 5;
        this.listItem.push(startingPotion);
        this.listItem.push(startingPotiball);
        GetListEquipe().push(potimon);
        AddPotimonCapture(potimon.baseId);
        controller.listCarte.push(AllCartes[0]);
        controller.worldMapController.init(controller.listCarte, controller.timeGame, controller.userName);
        controller.goOnline();
    },

    loadGame: function () {
        var controller = this;
        const userId = GetUserId();
        $.when(
            $.get("/api/saveAndLoad/loadEquipe", { userId: userId }),
            $.get("/api/saveAndLoad/loadGameInfo", { userId: userId }),
            $.get("api/saveAndLoad/loadItem", { userId: userId }),
            $.get("/api/saveAndLoad/loadReserve", { userId: userId }),
        ).then(function (a, b, c, d) {
            var equipeAjaxResult = a[0];
            var gameInfoAjaxResult = b[0][0];
            var itemAjaxResult = c[0][0];
            var reserveAjaxResult = d[0];
            if (equipeAjaxResult.length > 0) {
                var currentCarteId = gameInfoAjaxResult.current_carte_id;
                var timeGameSplit = gameInfoAjaxResult.game_time.split(':');
                var potiflouz = gameInfoAjaxResult.potiflouz;
                var potimonCapture = gameInfoAjaxResult.potimon_capture.split(',');
                var timeGameDate = new Date();
                timeGameDate.setHours(timeGameSplit[0]);
                timeGameDate.setMinutes(timeGameSplit[1]);
                timeGameDate.setSeconds(timeGameSplit[2]);
                controller.timeGame = timeGameDate;
                SetTimeGame(timeGameDate);
                SetPotiflouz(potiflouz);
                var itemsName = itemAjaxResult.items_name.split(',');
                var quantities = itemAjaxResult.quantities.split(',');
                for (let j = 0; j < itemsName.length; j++) {
                    var item = cloneItem(fetchItemByName(itemsName[j]));
                    item.quantity = quantities[j];
                    Items.push(item);
                }
                var requests = [];
                var requestsSkills = [];
                var ids = [];
                for (let i = 0; i < equipeAjaxResult.length; i++) {
                    requests.push(getPotimonById(equipeAjaxResult[i].potimon_id));
                }
                $.when.apply($, requests).done(function () {
                    $.each(arguments, function (i, data) {
                        controller.fillPotimon(data, i, equipeAjaxResult, ids, GetListEquipe());
                    });
                    requests = [];
                    for (let i = 0; i < reserveAjaxResult.length; i++) {
                        requests.push(getPotimonById(reserveAjaxResult[i].potimon_id));
                    }
                    $.when.apply($, requests).done(function () {
                        $.each(arguments, function (i, data) {
                            controller.fillPotimon(data, i, reserveAjaxResult, ids, controller.listReserve);
                        });
                        requests = [];
                        for (let i = 0; i < ids.length; i++) {
                            requests.push($.get("/api/saveAndLoad/loadSkills", { potimonGameId: ids[i] }));
                        }
                        $.when.apply($, requests).done(function () {
                            if (ids.length > 1) {
                                $.each(arguments, function (i, data) {
                                    controller.fillPotimonSkill(data[0], controller);
                                });
                            } else {
                                controller.fillPotimonSkill(arguments[0], controller);
                            }
                            for (let i = 0; i < currentCarteId + 1; i++) {
                                controller.listCarte.push(AllCartes[i])
                                SetCurrentCarteId(currentCarteId);
                            }
                            $.each(potimonCapture, function () {
                                GetMonstresCapture().push(parseInt(this));
                            });
                            controller.worldMapController.init(controller.listCarte, controller.timeGame, controller.userName);
                            controller.goOnline();
                        });
                    });
                });
            } else {
                controller.newGame();
            }
        });

    },

    fillPotimonSkill: function (skillTab, controller) {
        if (skillTab.length > 0) {
            var potimon = GetListEquipe().find(x => x.id === skillTab[0].potimon_game_id) || controller.listReserve.find(x => x.id === skillTab[0].potimon_game_id);
            $.each(skillTab, function (index) {
                if (!potimon.skills.find(x => x.id == this.skill_id)) {
                    potimon.skills.push(fetchSkill(this.skill_id));
                }
            });
        }
    },

    fillPotimon: function (data, i, ajaxResult, ids, listToFill) {
        var inGamePotimon = {};
        var basePotimon = mapBasePotimon(data);
        inGamePotimon = new Potimon(basePotimon, ajaxResult[i].potimon_level, 0, 0, 0, false, [], null);
        inGamePotimon.currentHp = ajaxResult[i].potimon_current_hp;
        inGamePotimon.currentMana = ajaxResult[i].potimon_current_mana;
        inGamePotimon.experience = ajaxResult[i].potimon_experience;
        inGamePotimon.id = ajaxResult[i].potimon_game_id;
        inGamePotimon.gentil = true;
        setSkillsByLevel(inGamePotimon, basePotimon);
        listToFill.push(inGamePotimon);
        ids.push(inGamePotimon.id);
    },

    newUser: function () {
        var idModal = 'modalNewUser';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var modalBody = createModal(idModal, 'New User');
        var inputList = [
            { label: 'Pseudo', id: 'newUserPseudoId', type: 'text' },
            { label: 'Email', id: 'newUserEmailId', type: 'email' },
            { label: 'Password', id: 'newUserPasswordId', type: 'password' },
        ];
        var form = createForm('NewUserForm', inputList, modalBody);
        var btnSubmit = displayElementOnParent('button', 'btnSubmitNewUser', 'btn btn-default', 'Soumettre', modalBody);
        btnSubmit.click(function () {
            $.ajax({
                url: '/api/users/insertUser',
                data: {
                    userName: $('#' + inputList[0].id).val(),
                    email: $('#' + inputList[1].id).val(),
                    password: $('#' + inputList[2].id).val(),
                    guidToken: guidGenerator(),                
                },
                type: 'get',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.responseText);
                },
                success: function (data) {
                    alert('Inscription réussie !')
                    $('#' + idModal).modal('hide');
                }
            });
        });
        $('#' + idModal).modal();
    },

    logIn: function () {
        var controller = this;
        var idModal = 'modalLogIn';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var modalBody = createModal(idModal, 'Log In');
        var inputList = [
            { label: 'Pseudo', id: 'logInPseudoId', type: 'text' },
            { label: 'Password', id: 'logInPasswordId', type: 'password' },
        ];
        var form = createForm('LogInForm', inputList, modalBody);
        var btnSubmit = displayElementOnParent('button', 'btnSubmitLogIn', 'btn btn-default', 'Soumettre', modalBody);
        btnSubmit.click(function () {
            $.get('/api/users/selectUser', {
                userName: $('#' + inputList[0].id).val(),
                password: $('#' + inputList[1].id).val(),
            }).then(function (a) {
                if (a[0]) {
                    if (a[0].user_id) {
                        SetUserId(a[0].user_id);
                        SetUserName($('#' + inputList[0].id).val());
                        controller.loadGame();
                    }
                } else {
                    alert("Pseudo et/ou mot de passe non trouvé.")
                }
            })
        });
        $('#' + idModal).modal();
    },

    goOnline: function () {
        var socket = io();
        this.worldMapController.onlineController.socket = socket;
        this.userId = guidGenerator();
        this.worldMapController.onlineController.userId = this.userId;
        this.worldMapController.combatController.userId = this.userId;
        var controller = this;
        socket.emit('go online', new User(controller.userId, GetUserName(), GetListEquipe()));
        socket.on('all users', function (allUsers) {
            controller.worldMapController.listUser = allUsers;
            controller.worldMapController.onlineController.refreshDuelList(controller.worldMapController.listUser, controller.userId);
        });

        socket.on('duel query', function (data) {
            controller.worldMapController.onlineController.view.renderDuelQueryChallenged(data.userChallenging);
            controller.worldMapController.onlineController.activateDuelBtn(data.userChallenging);
        });

        socket.on('update query', function (data) {
            socket.emit('update team', { userId: controller.userId, equipe: GetListEquipe(), previousUserId: data })
        });

        socket.on('update complete', function (data) {
            controller.worldMapController.onlineController.startDuel(data);
        });

        socket.on('start duel', function (data) {
            var opponent = [data.userChallengingId, data.userChallengedId].find(x => x.id != controller.userId);
            controller.worldMapController.combatController.initDuel(opponent, data.carte, data.listPlayer, data.room);
        });

        socket.on('action', function (data) {
            controller.worldMapController.combatController.attaque(data.attaqueResults, data.sourceId, data.skillId, controller.worldMapController.combatController);
        });

        socket.on('chat message', function (msg) {
            $('#messageContainer').append($('<li>').text(msg));
        });

    },
}
