var SaveMenuController = function (view) {
    this.view = view;
};

SaveMenuController.prototype = {

    init: function () {
        this.view.sauvegarder = this.sauvegarder.bind(this);
        this.view.render();
    },

    displaySaveMenu: function() {
        this.view.render();
        $('#' + strSaveMenu).modal();
    },

    sauvegarder: function () {
        this.view.displaySaving();
        var equipe = GetListEquipe();
        var reserve = GetListReserve();  
        var controller = this;      
        var requests = [
            $.get("/api/saveAndLoad/deleteEquipe", { userId: GetUserId() }),
            $.get("/api/saveAndLoad/deleteReserve", { userId: GetUserId() }),
            $.get("/api/saveAndLoad/deleteSkills", {userId : GetUserId()}),
            $.get("/api/saveAndLoad/saveGameInfo",
                {
                    gameTime: GetTimeGame().toTimeString().split(' ')[0],
                    currentCarteId: GetCurrentCarteId(),
                    userId: GetUserId(),
                    potiflouz: GetPotiflouz(),
                    potimonCapture: GetMonstresCapture().join(','),
                }
            ),
            $.get("/api/saveAndLoad/saveItem",
                {
                    userId: GetUserId(),
                    itemsName: GetItems().map(x => x.name).join(),
                    quantities: GetItems().map(x => x.quantity).join(),
                }
            ),
        ];
        $.when.apply($, requests).done(function () {
            requests = [];
            $.each(equipe, function (index) {
                var player = this;
                requests.push(
                    $.get("/api/saveAndLoad/saveEquipe",
                        {
                            potimonId: player.baseId,
                            potimonGameId: player.id,
                            potimonLevel: player.level,
                            potimonCurrentHp: player.currentHp,
                            potimonCurrentMana: player.currentMana,
                            potimonExperience: player.experience,
                            userId: GetUserId(),
                        }
                    ));
                $.each(player.skills, function (index) {
                    var skill = this;
                    requests.push(
                        $.get("/api/saveAndLoad/saveSkills",
                            {
                                potimonGameId: player.id,
                                skillId: skill.id,
                                userId: GetUserId(),
                            }
                        )
                    );
                });
            });
            $.each(reserve, function (index) {
                var player = this;
                requests.push($.get("/api/saveAndLoad/saveReserve",
                    {
                        potimonId: player.baseId,
                        potimonGameId: player.id,
                        potimonLevel: player.level,
                        potimonCurrentHp: player.currentHp,
                        potimonCurrentMana: player.currentMana,
                        potimonExperience: player.experience,
                        userId: GetUserId(),
                    }
                ));
                $.each(player.skills, function (index) {
                    var skill = this;
                    requests.push(
                        $.get("/api/saveAndLoad/saveSkills",
                            {
                                potimonGameId: player.id,
                                skillId: skill.id,
                                userId: GetUserId(),
                            }
                        )
                    );
                });
            })
            $.when.apply($, requests).done(function () {
                controller.view.displaySaveComplete();
            });
        });        
    },
}