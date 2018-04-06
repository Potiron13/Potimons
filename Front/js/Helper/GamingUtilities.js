function heal(player, ammount){
    ammount = Math.round(ammount);
    if (player.hp - player.currentHp > ammount) {
        player.currentHp += ammount;
    }else {
        player.currentHp = player.hp;
    }
};