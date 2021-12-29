const axios = require('axios')
const baseURL = require('./baseUrl')


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
    let response = await axios(axiosInstance).then(res=>{
        return res
    })
    .catch(err=>{
        return err;
    })
    return response

    // AXIOS INSTANCE
}