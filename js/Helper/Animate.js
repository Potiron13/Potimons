
function animateGriffe(player, target, skill) {
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

function animateProjectil(player, target, skill) {
    var playerElement = $('#' + player.id);
    var targetElement = $('#' + target.id);
    var imgMagie = document.createElement('img');
    imgMagie.src = skill.src;
    imgMagie.id = skill.name + "Img"
    imgMagie.style="position:absolute";
    imgMagie.style.zIndex = "10";
    imgMagie.style.height = "300px";
    imgMagie.style.width = "300px";
    playerElement.prepend(imgMagie);
    var jqueryImg = $('#' + imgMagie.id);
    jqueryImg.animate({
        left: targetElement.offset().left - playerElement.offset().left + targetElement.width()/2 - jqueryImg.width()/2 + 'px',
        top: targetElement.offset().top - playerElement.offset().top + 'px'
    }, skill.duration);
}
