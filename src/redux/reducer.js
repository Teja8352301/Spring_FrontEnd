import {actionTypes} from './actionTypes'

const addProductInitial = {
    spinner:false,
    lastProductData:{},
    success:false
}

export const addProductReducer = (state=addProductInitial,action) =>{
    switch (action.type) {
        case actionTypes.addProduct:
            return {...state,spinner:action.spinner,lastProductData:action.data,success:action.success}

        case actionTypes.addProductSpinner:
            return {...state,spinner:action.spinner,success:action.success}

        case actionTypes.addProductSuccess:
            return {...state,success:action.success}
        
        default:
            return state
    }
}

const totalProductsInitial = {
    products:[],
    count:0,
    spinner:true,
    addToCart:'',
    details:''
}

export const getTotalProducts = (state = totalProductsInitial,action)=>{
    switch (action.type) {
        case actionTypes.getTotalProducts:
            return {...state,products:action.data,spinner:action.spinner,count:action.data.length}

        case actionTypes.getTotalProductsSpinner:
            return {...state,spinner:action.spinner}

        case actionTypes.clearTotalProducts:
            return {...totalProductsInitial}

        case actionTypes.totalProductsAddtoCart:
            return {...state,addToCart:action.id}

        case actionTypes.totalProductsDetails:
            return {...state,details:action.id}

        case actionTypes.clearTotalProductsAddToCart:
            return {...state,addToCart:''}

        case actionTypes.clearTotalProductsDetails:
            return {...state,details:''}
    
        default:
            return state
    }
}
