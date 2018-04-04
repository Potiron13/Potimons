class ViewModelPotidex {
    constructor(monster, capture) {
        this.name = monster.identifier;
        this.capture = capture;
        this.src = getSrc(monster.id);
        this.description = monster.description;
    }
}
