function heal(player, ammount){
    if (player.hp - player.currentHp > ammount) {
        player.currentHp += ammount;
    }else {
        player.currentHp = player.hp;
    }
};