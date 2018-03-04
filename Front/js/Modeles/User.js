class User {
    constructor(id, name, equipe, socket) {
        this.id = id;
        this.name = name;
        this.equipe = equipe;
        this.socket = socket;
    }
}

class ViewModelUser {
    constructor(user) {
        this.name = user.name;
    }
}
