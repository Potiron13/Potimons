var Equipe = [];
var Items = [];
var Reserve = [];
var Fusion = [];
var Cartes = [];
var MonstresCapture = [];
var PotidexMonstres = [];
var Users = [];
var UserName = '';
var UserID = 0;
var TimeGame = new Date(0, 0, 0, 0, 0, 0, 0);
var CurrentCarteId = 0;
var Potiflouz = 500;
var ItemInShop = AllItems;

function SetPotidexMonstres(list){
    PotidexMonstres = list;
}

function GetPotidexMonstres(){
    return PotidexMonstres;
}

function SetUserName(userName) {
    UserName = userName;
}

function GetUserName() {
    return UserName;
}

function GetListEquipe() {
    return Equipe;
}

function GetListReserve(){
    return Reserve;
}

function GetMonstresCapture(){
    return MonstresCapture;
}

function AddPotimonCapture(id) {
    MonstresCapture.push(id);
}

function GetUserId() {
    return UserID;
}

function SetUserId(value) {
    UserID = value;
}

function GetCurrentCarteId(){
    return CurrentCarteId;
}

function SetCurrentCarteId(value){
    CurrentCarteId = value;
}

function GetTimeGame() {
    return TimeGame;
}

function SetTimeGame(value){
    TimeGame = value;
}

function GetItems(){
    return Items;
}

function GetPotiflouz(){
    return Potiflouz;
}

function SetPotiflouz(value){
    Potiflouz = value;
}

function GetItemInShop(){
    return ItemInShop;
}

function SetItemInShop(value){
    ItemInShop = value;
}