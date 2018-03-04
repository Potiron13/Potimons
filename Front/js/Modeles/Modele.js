var Equipe = [];
var Items = [];
var Reserve = [];
var Fusion = [];
var Cartes = [];
var MonstresCapture = [];
var Users = [];
var UserName = '';
var TimeGame = new Date(0, 0, 0, 0, 0, 0, 0);

function SetUserName(userName) {
    UserName = userName;
}

function GetUserName() {
    return UserName;
}

function GetListEquipe() {
    return Equipe;
}

function GetMonstresCapture(){
    return MonstresCapture;
}
