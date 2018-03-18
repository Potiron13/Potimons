
function animateCorpsACorps(player, target, skill) {
    var finRotation = player.gentil ? 90 : -90;
    var id = setInterval(frame, 1);
    var compteurRotation = 0;
    function frame() {
        if (Math.abs(compteurRotation) >= skill.duration) {
            clearInterval(id);
            if (document.getElementById(player.id)) {
                document.getElementById(player.id).style.transform = "";
            }
        } else {
            if (document.getElementById(player.id)) {
                document.getElementById(player.id).style.transform = "rotate(" + compteurRotation/10 + "deg)";
            }
            compteurRotation = player.gentil ? compteurRotation + 10 : compteurRotation - 10;
        }
   }

   animateProjectil(target, target, skill, 5, 5);
}

function animateCharge(player, target, skill) {
    var playerElement = $('#' + player.id);
    var targetElement = $('#' + target.id);
    playerElement.animate({
        left: targetElement.offset().left - playerElement.offset().left + targetElement.width()/2 - playerElement.width()/2 + 'px',
        top: targetElement.offset().top - playerElement.offset().top + 'px'
    }, skill.duration);
    playerElement.animate({
        left: 0 + 'px',
        top: 0 + 'px'
    });
}

function animateProjectil(player, target, skill, height, width) {
    var playerElement = $('#' + player.id);
    var targetElement = $('#' + target.id);
    var imgMagie = document.createElement('img');
    imgMagie.src = skill.src;
    imgMagie.id = skill.id + "Img"
    imgMagie.style="position:absolute";
    imgMagie.style.zIndex = "10";
    if (!width) {
        width = 10;
    }
    if (!height) {
        height = 10;
    }
    imgMagie.style.height = height + "em";
    imgMagie.style.width = width + "em";
    playerElement.prepend(imgMagie);
    var jqueryImg = $('#' + imgMagie.id);
    jqueryImg.animate({
        left: targetElement.offset().left - playerElement.offset().left + targetElement.width()/2 - jqueryImg.width()/2 + 'px',
        top: targetElement.offset().top - playerElement.offset().top + targetElement.height()/2 - jqueryImg.height()/2 + 'px'
    }, skill.duration);
    setTimeout(function(){
        $("#" + skill.id + "Img").remove();
    }, skill.duration)
}

function animateLancePotiball(player, target, potiball) {
    var playerElement = $('#colonne' + player.id)
    var targetElement = $('#colonne' + target.id);
    var imgPotiball = document.createElement('img');
    var duration = 1000;
    imgPotiball.src = potiball.src;
    imgPotiball.id = potiball.name + "Img"
    imgPotiball.style="position:absolute";
    imgPotiball.style.zIndex = "10";
    imgPotiball.style.height = "10em";    
    playerElement.append(imgPotiball);
    var jqueryImg = $('#' + imgPotiball.id);
    jqueryImg.animate({
        left: targetElement.offset().left - playerElement.offset().left + targetElement.width()/2 - jqueryImg.width()/2 + 'px',
        top: targetElement.offset().top - playerElement.offset().top + targetElement.height()/2 - jqueryImg.height()/2 + 'px'
    }, duration);


    return duration;
}

function animateRay(player, target, skill){
    var playerElement = $('#colonne' + player.id)
    var targetElement = $('#' + target.id);
    var gifRay = document.createElement('img');
    var duration = 1000;
    var playerPosition = playerElement.offset();
    var targetPosition = targetElement.offset();
    gifRay.src = skill.src;
    gifRay.id = skill.id + "Img";
    gifRay.style="position:absolute";
    gifRay.style.zIndex = "0";
    var heightBetweenPlayers = Math.abs(targetPosition.top + targetElement.height()/2 - playerPosition.top - playerElement.height()/2);    
    var widthBetweenPlayers = Math.abs(targetPosition.left + targetElement.width()/2 - playerPosition.left - playerElement.width()/2);    
    var distanceBetweenPlayers =  Math.sqrt(Math.pow(heightBetweenPlayers, 2) + Math.pow(widthBetweenPlayers, 2));    
    gifRay.style.height = distanceBetweenPlayers + 'px';    
    gifRay.style.width = '300px';    
    playerElement.prepend(gifRay);
    var jqueryImg = $('#' + gifRay.id);
    setTimeout(function(){
        jqueryImg.css({
            position: 'absolute',
            left : playerElement.width()/2 + playerPosition.left + widthBetweenPlayers/2 - jqueryImg.width()/2 + 'px',
            top : -(heightBetweenPlayers/2 + jqueryImg.height()/2 - playerElement.height()/2) + 'px',
        });
        jqueryImg.css({ 
            'transform' : 'rotate(' + Math.atan(widthBetweenPlayers/heightBetweenPlayers)*180/Math.PI + 'deg)'
        })
        console.log(heightBetweenPlayers);
        console.log(widthBetweenPlayers);
        
    }, 10)

    setTimeout(function(){
        $("#" + skill.id + "Img").remove();
    }, skill.duration)
}

function animateOverHead(player, target, skill) {    
    var targetElement = $('#colonne' + target.id);
    var gifOverHead = document.createElement('img');
    var duration = 1500;    
    var targetPosition = targetElement.offset();
    gifOverHead.src = skill.src;
    gifOverHead.id = skill.id + "Img";
    gifOverHead.style="position:absolute";
    gifOverHead.style.zIndex = "10";    
    gifOverHead.style.height = targetPosition.top + targetElement.height() + 'px';    
    gifOverHead.style.width = '200px';    
    targetElement.prepend(gifOverHead);
    var jqueryImg = $('#' + gifOverHead.id);    
    jqueryImg.css({
        position: 'absolute',
        left : targetElement.left + 'px',
        top : targetElement.top + 'px',
    });    
    setTimeout(function(){
        $("#" + skill.id + "Img").remove();
    }, skill.duration)
}