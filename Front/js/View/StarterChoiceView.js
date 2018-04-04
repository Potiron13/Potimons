var StarterChoiceView = function () {
};

StarterChoiceView.prototype = {

    render: function(starters, mainMenuController, newGameInit) {
            $.each($('body').children(), function(index, child){
                child.remove();
            });
            document.body.style.backgroundImage =  strPathStartingScreen;
            var seperationTopRow = displayElementOnParent('div', 'seperationTopRow', 'col-sm-12', '', $('body'));
            seperationTopRow.css({
                'height' : '20%',
            });
            var wrapper = displayElementOnParent('div', 'lauchCombatWrapper', 'col-sm-12 btnWrapper', '', $('body'));
            wrapper.css({
                'height': '50%',
            })
            var container = displayElementOnParent('div', 'lauchCombatContainer', 'container', '', wrapper);
            container.css({
                'height': '100%',
            })
            var jumbotron = displayElementOnParent('div', 'lauchCombatJumbotron', 'jumbotron', '', container);
            jumbotron.css({
                'height': '100%',
            })
            var seperationTopBtnRow = displayElementOnParent('div', 'seperationTopBtnRow', 'col-sm-12', '', jumbotron);
            seperationTopBtnRow.css({
                'height': '20%',
            });
            var nameRow = displayElementOnParent('div', 'nameRow', 'row', '', jumbotron);
            var ImgRow = displayElementOnParent('div', 'imgRow', 'row', '', jumbotron);       
            var btnDetailRow = displayElementOnParent('div', 'btnDetailRow', 'row', '', jumbotron);
            var btnSkillsRow = displayElementOnParent('div', 'btnSkillsRow', 'row', '', jumbotron);  
            $.each(starters, function(index){
                var starter = this;
                var name = displayElementOnParent('div', 'nameValue' + this.id, 'col-sm-4', this.name, nameRow);
                name.css({color: 'white'});
                var colImg = displayElementOnParent('div', 'imgValue' + this.id, 'col-sm-4', '', ImgRow);
                var playerImg = document.createElement('img');                
                playerImg.src =  getSrcPortrait(this.src);         
                playerImg.style.width = '100%';
                colImg.append(playerImg);
                colImg.click(function() {
                    newGameInit(starter);
                    document.body.style.cursor = 'auto';
                });
                colImg.hover(
                    function(){
                        document.body.style.cursor = 'pointer'
                    },
                    function(){
                        document.body.style.cursor = 'auto'
                    }
                );
                var btnDetailCol = displayElementOnParent('div', 'btnDetailCol' + this.id, 'col-sm-4', '', btnDetailRow);
                var btnSkillsCol = displayElementOnParent('div', 'btnSkillsCol' + this.id, 'col-sm-4', '', btnSkillsRow); 
                displayButtons ('btnDetailsStarter' + this.id , 'Details', 'BUTTON', function () {mainMenuController.displayDetails(starter.id)}, btnDetailCol);
                displayButtons ('btnSkillsStarter' + this.id , 'Competences', 'BUTTON', function () {mainMenuController.displaySkills(starter.id)}, btnSkillsCol);
            });
    },
}
