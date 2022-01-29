import {actionTypes} from './actionTypes'
import axiosInstance from '../axiosInstance'
const {sessionSave} = require('../utils/utils')

export const addProductService = (apiPayload) =>{
    return (dispatch,getState)=>{
        dispatch({type:actionTypes.addProductSpinner,spinner:true,success:false})
        axiosInstance(apiPayload).then(res=>{
            dispatch({type:actionTypes.addProduct,spinner:false,data:res.data,success:true})
            dispatch({type:actionTypes.addProductSuccess,success:false})
        })
        .catch(err=>{
            dispatch({type:actionTypes.addProductSpinner,spinner:false,success:false})
        })
    }
}


export const getTotalProducts = (apiPayload) =>{
    return (dispatch,getState) =>{
        axiosInstance(apiPayload).then(res=>{
            dispatch({type:actionTypes.getTotalProducts,data:res.data,spinner:false})
        })
    }
}

export const getDetailProduct = (apiPayload) =>{
    return (dispatch,getState)=>{
        axiosInstance(apiPayload).then(res=>{
            dispatch({type:actionTypes.getDetailProduct,data:res.data,spinner:false})
        })
    }
}


export const getAdminProducts = (apiPayload)=>{
    return (dispatch,getState)=>{
        axiosInstance(apiPayload).then(res=>{
            dispatch({type:actionTypes.getAdminProducts,data:res.data,spinner:false})
        })
    }
}

export const deleteAdminProduct = (apiPayload) =>{
    return (dispatch)=>{
        dispatch({type:actionTypes.deleteAdminProduct,deleteId:apiPayload.productId})
        axiosInstance(apiPayload).then(res=>{
            let payload = {};
            payload['method'] = 'GET'
            payload['url'] = 'products/getAllProducts'
            dispatch(getAdminProducts(payload))
        })
    }
}

export const loadCartItems = (apiPayload)=>{
    return (dispatch,getState)=>{
        axiosInstance(apiPayload).then(res=>{
            dispatch({type:actionTypes.loadCartItems,data:res.data,spinner:false})
        })
    }
}

export const addToCart = (apiPayload,actionType)=>{
    return (dispatch,getState)=>{
        axiosInstance(apiPayload).then(res=>{
            dispatch({type:actionType})
        })
    }
}

export const removeItemFromCart = (apiPayload)=>{
    return (dispatch,getState)=>{
        axiosInstance(apiPayload).then(res=>{
            dispatch({type:actionTypes.loadCartItems,data:res.data,spinner:false})
        })
        .catch(err=>{
            dispatch({type:actionTypes.cartItemsSpinner,spinner:false})
        })
    }
}

export const orderNow = (apiPayload)=>{
    return (dispatch)=>{
        axiosInstance(apiPayload).then(res=>{
        dispatch({type:actionTypes.disableOrderNowButton})
        let payload = {}
        payload['url'] = 'cart/getCartProducts'
        payload['method'] = 'GET'
        dispatch(loadCartItems(payload))
    })
    }
}

export const getOrder = (apiPayload)=>{
    return (dispatch)=>{
        axiosInstance(apiPayload).then(res=>{
            dispatch({type:actionTypes.getOrderDetails,data:res.data && res.data.orders || [],spinner:false})
        })
    }
}

export const validateLogin =  (apiPayload)=>{
    return (dispatch)=>{
        let success = false
        dispatch({type:actionTypes.validateLoginSpinner,spinner:true,success:success})
        axiosInstance(apiPayload).then(res=>{
            if(res && res.headers && res.headers['jwt_token'] && res.headers['jwt_token'].length>0 && res.headers['authid'] && res.headers['authid'].length>0){
                success = true
            }
            dispatch({type:actionTypes.validateLoginSuccess,spinner:false,success:success})
            window.location.href="shop"
        }).catch(err=>{
            dispatch({type:actionTypes.validateLoginSuccess,spinner:false,success:false})
        })
    }
}