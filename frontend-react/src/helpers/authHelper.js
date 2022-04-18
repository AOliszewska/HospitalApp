export function getCurrentUser(){
    return JSON.parse(localStorage.getItem('user'));;
}
export function isAuthenticated(){
    const user = getCurrentUser()
    if(user){
        return true
    }
    return false
}

export function isDoctor(){
    const user = getCurrentUser()
    if(isAuthenticated()){
        return user._idRola===3;
    }
    return false
}