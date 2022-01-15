import {actionTypes} from './actionTypes'
import axiosInstance from '../axiosInstance'

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