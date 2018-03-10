
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
    imgMagie.id = skill.name + "Img"
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
        $("#" + skill.name + "Img").remove();
    }, skill.duration)
}

function animateLancePotiball(player, target, potiball) {
    var playerElement = $('#colonne' + player.id)
    var targetElement = $('#' + target.id);
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
