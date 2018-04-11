function SaveSessionGuid(sessionGuid) {    
    localStorage.setItem('sessionGuid', sessionGuid);
}

function GetSessionGuid(){
    return localStorage.getItem('sessionGuid');
}

function DeleteSessionGuid(){
    localStorage.removeItem('sessionGuid');
}