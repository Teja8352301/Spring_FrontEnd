const axios = require('axios')
const baseURL = require('./baseUrl')
const {setCookie,sessionSave,clearCookie,getCookie} = require('./utils/utils')



module.exports = async(apiObject) =>{

    // BASE URL--------------------

    // BASE URL--------------------


    // INTERCEPTORS-------------

    // axios.interceptors.request.use((config)=> {
    //     console.log('-------------------------------------')
    //     console.log(config)
    //     console.log('-------------------------------------')
    //     return config;
    //   },(error)=> {
    //     return Promise.reject(error);
    //   });
      
    // INTERCEPTORS-------------

    // AXIOS INSTANSE

    

    let axiosInstance = {};
    if(apiObject.method != 'GET'){
        axiosInstance['data'] = apiObject.body || {};
    }
    axiosInstance['method'] = apiObject.method;
    axiosInstance['url'] = baseURL+apiObject.url;
    let headers = {}
    const jwt_tokenH = getCookie('jwt_token') && getCookie('jwt_token').length
    const authidH = getCookie('authid') && getCookie('authid').length
    if(jwt_tokenH){
        headers['jwt_token'] = getCookie('jwt_token')
    }
    if(authidH){
        headers['authid'] = getCookie('authid')
    }
    axiosInstance['headers']=headers
    
    let response = await axios(axiosInstance).then(res=>{
        console.log(res)
        headersAxios(res)
        return res
    })
    .catch(err=>{
        return err;
    })
    return response

    // AXIOS INSTANCE
}


const headersAxios = (response)=>{
    const headers = response.headers
    if(headers['jwt_token'] && headers['jwt_token'].length>0){
        setCookie('jwt_token',headers['jwt_token'])
    }

    if(headers['authid'] && headers['authid'].length>0){
        setCookie('authid',headers['authid'])
    }

    if(headers['auth_logged']){
        if(headers['auth_logged'] == "false"){
            clearCookie("jwt_token")
            clearCookie('authid')
        }
        sessionSave('auth_logged',headers['auth_logged'])
    }
}