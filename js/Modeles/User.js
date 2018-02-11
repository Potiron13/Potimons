class User {
    constructor(id, name, equipe) {
        this.id = id;
        this.name = name;
        this.equipe = equipe
    }
}

class ViewModelUser {
    constructor(user) {
        this.name = user.name;
    }
}
