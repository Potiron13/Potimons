class ViewModelPotidex {
    constructor(monster, capture) {
        this.name = monster.name;
        this.capture = capture;
        this.src = getSrc(monster.name);
        this.description = monster.description;
    }
}
