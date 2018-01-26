/*
    handleStart: function(event) {
        var touches = event.changedTouches;
        deplacementSouris(touches[0].clientX, touches[0].clientY)
    },

    handleEnd: function(event) {
          finDeplacementSouris();
    },
*/

/*
    deplacementSouris: function(clientX, clientY) {
        this.deplacerPotironAuxCoordonnees(clientX, clientY);
        this.deplacementSouris_timeout = setInterval(function(){deplacerPotironAuxCoordonnees(clientX, clientY)}, 10);
    },

    finDeplacementSouris: function() {
        clearTimeout(this.deplacementSouris_timeout);
    },

    deplacerPotironAuxCoordonnees: function(clientX, clientY) {
        var increment = 1;
        var potironElement = document.getElementById('potironWolrdMap');
        var roundClientX = Math.round(clientX);
        var roundClientY = Math.round(clientY);
        if (potironPos.X + 'px' != roundClientX || potironPos.Y + 'px' != roundClientY) {
            if(Math.abs(potironPos.X - roundClientX) > Math.abs(potironPos.Y - roundClientY))
            {
              if(potironPos.X - roundClientX > 0)
              {
                  potironPos.X = potironPos.X - increment;
                  potironElement.className = 'potironWalkingLeft';
              }
              else
              {
                  potironPos.X = potironPos.X + increment;
                  potironElement.className = 'potironWalkingRight';
              }

            }
            else if ( potironPos.X - roundClientX == potironPos.Y - roundClientY)
            {
                if(potironPos.X - roundClientX  > 0)
                {
                    potironPos.X = potironPos.X - increment;
                    potironPos.Y = potironPos.Y - increment;
                    potironElement.className = 'potironWalkingNW';
                }
                else
                {
                    potironPos.X = potironPos.X + increment;
                    potironPos.Y = potironPos.Y + increment;
                    potironElement.className = 'potironWalkingSE';
                }
            }
            else if (potironPos.X - roundClientX == -(potironPos.Y - roundClientY))
            {
                if(potironPos.X - roundClientX > 0)
                {
                    potironPos.X = potironPos.X - increment;
                    potironPos.Y = potironPos.Y + increment;
                    potironElement.className = 'potironWalkingSW';
                }
                else
                {
                    potironPos.X = potironPos.X + increment;
                    potironPos.Y = potironPos.Y - increment;
                    potironElement.className = 'potironWalkingNE';
                }
            }
            else
            {
              if(potironPos.Y - roundClientY > 0)
              {
                  potironPos.Y = potironPos.Y - increment;
                  potironElement.className = 'potironWalkingUp';
              }
              else
              {
                  potironPos.Y = potironPos.Y + increment;
                  potironElement.className = 'potironWalkingDown';
              }

            }
            potironElement.style.left = potironPos.X + 'px';
            potironElement.style.top = potironPos.Y + 'px';
            this.decrementerCompteurCombat(1);
        }
    },
*/

/*

    addEventOnBody: function() {
        var controller = this;
        $('body').on('keydown', function(event){controller.deplacement(event, controller)});
        /*document.addEventListener('touchstart', this.handleStart);
        document.addEventListener('touchend', this.handleEnd);*/
    },
/*
    deplacement: function(event, controller) {
        var potironElement = document.getElementById('potironWolrdMap');
        if(event.keyCode == 37) {
            potironElement.className = 'potironWalkingLeft';
            potironPos.X -= ( potironPos.X > 0 ) ? 5 : 0;
        }
        else if(event.keyCode == 38) {
            potironElement.className = 'potironWalkingUp';
            potironPos.Y -= ( potironPos.Y > 0 ) ? 5 : 0;
        }
        else if(event.keyCode == 39) {
            potironPos.X += 5;
            potironElement.className = 'potironWalkingRight';
        }
        else if(event.keyCode == 40) {
            potironElement.className = 'potironWalkingDown';
            potironPos.Y += 5;
        }
        if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
            potironElement.style.top = potironPos.Y + 'px';
            potironElement.style.left = potironPos.X + 'px';
            controller.decrementerCompteurCombat(5, controller);
        }
    },*/

    /*
        calculerNiveauMoyen: function(listPlayer) {
            var sum = 0;
            $.each(listPlayer, function(index) {
                sum = sum + this.level;
            });

            return sum/listPlayer.length
        },
    *//*

    decrementerCompteurCombat: function(decrement, controller) {
        this.compteur -= decrement;
        var controller = this;
        if (this.compteur <= 0) {
            $('body').off();
            var id = setInterval(frame, 1);
            var compteurTransition = 0;
            function frame() {
                if (compteurTransition*5 >= 715) {
                    clearInterval(id);
                    $('#potironWolrdMap').hide();
                    $('#cristalSauvegarde').hide();
                    $('#btnOuvrirMainMenu').hide();
                    document.getElementById("potironWolrdMap").style.transform = "";
                    controller.combatController.init(controller.carte);
                    controller.combatController.combat();

                } else {
                    document.getElementById("potironWolrdMap").style.transform = "rotate(" + compteurTransition*5 + "deg)";
                    compteurTransition++;
                }
            }
        }
    },*/
