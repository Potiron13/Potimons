class Equipement {
    constructor(id, name, attaque) {
        this.id = id;
        this.name = name;
    }
}

class Arme extends Equipement {
    constructor(attaque) {
        this.attaque = attaque;
    }
}

class Armure extends Equipement {
    constructor(defence) {
        this.attaque = defence;
    }
}

class Collier extends Equipement {
    constructor(attaque, defence) {
        this.attaque = attaque;
        this.defence = defence;
    }
}
