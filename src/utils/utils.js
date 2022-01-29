const { actionTypes } = require('../redux/actionTypes');
const {reduxState} = require('../redux/state')

const getCookie = (cookieName) =>{
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }

const setCookie =(cookieKey,cookieValue)=>{
let cookie = `${cookieKey}=${cookieValue}`
document.cookie = cookie
}

const clearCookie = (cookieName)=>{
    const d = new Date();
  d.setTime(d.getTime());
  let expires = "expires="+ d.toUTCString();
let cookie = `${cookieName}='';${expires};path=/spring`
let cookie2 = `${cookieName}='';${expires};path=/`
document.cookie = cookie
document.cookie = cookie2
}

const sessionSave=(sessionKey,sessionValue)=>{
    window.sessionStorage.removeItem(sessionKey)
    // if(sessionValue.includes(',')){
    //     let arr = sessionValue.split(',')
    //     window.sessionStorage.setItem(sessionKey,arr[arr.length-1])
    // }
    // else{
        window.sessionStorage.setItem(sessionKey,sessionValue)
        let loggedOrNot = sessionValue == "true" ? true :false
        reduxState.dispatch({type:actionTypes.toggleLoginSessionStorage,logged:loggedOrNot})
    // }
}

const deleteSession = (sessionKey)=>{
    window.sessionStorage.removeItem(sessionKey)
}

module.exports={
    sessionSave,
    deleteSession,
    getCookie,
    setCookie,
    clearCookie
}
