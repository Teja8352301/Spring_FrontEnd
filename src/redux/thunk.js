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
