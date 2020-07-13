function setToken(token){
    localStorage.setItem("ACCESS_TOKEN",token)
}

function getToken(){
    return localStorage.getItem("ACCESS_TOKEN")
}
function removeToken(){
    localStorage.removeItem("ACCESS_TOKEN")
}

export default {
    setToken,getToken,removeToken
}