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
            return {...state,products:action.data,spinner:action.spinner,count:action.data && action.data.length || 0}

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

let detailProductInitial = {
    product:{},
    spinner:true,
    addToCartSpinner:false,
    addToCart:''
}

export const detailProductReducer = (state=detailProductInitial,action) =>{
    switch (action.type) {
        case actionTypes.getDetailProduct:
            return {...state,product:action.data,spinner:action.spinner}

        case actionTypes.detailAddToCartProduct:
            return {...state,addToCartSpinner:true,addToCart:action.id}

        case actionTypes.detailCartSpinner:
            return {...state,addToCartSpinner:false}

        case actionTypes.clearDetailProduct:
            return detailProductInitial
        
        default:
           return state
    }
}

let adminProductsInitial={
    spinner:true,
    products:[],
    updateProduct:'',
    deleteProduct:''
}


export const adminProductsReducer = (state=adminProductsInitial,action)=>{
    switch(action.type){
        case actionTypes.getAdminProducts:
            return {...state,products:action.data,spinner:action.spinner}
            
        case actionTypes.getAdminProductsSpinner:
            return {...state,spinner:action.spinner}

        case actionTypes.updateAdminProduct:
            return {...state,updateProduct:action.updateId}

        case actionTypes.clearAdminProducts:{
            return {...state,products:[],spinner:true,updateProduct:''}
        }

        case actionTypes.deleteAdminProduct:{
            return {...state,deleteProduct:action.deleteId}
        }

        default:
            return state
    }
}


let initialCartItems = {
    spinner:true,
    cartitems:[],
    disable:false
}

export const cartItemsReducer = (state=initialCartItems,action)=>{
    switch(action.type){
        case actionTypes.loadCartItems:
            return {...state,cartitems:action.data,spinner:false}
        
        case actionTypes.cartItemsSpinner:
            return {...state,spinner:action.spinner}

        case actionTypes.clearCartItems:
            return initialCartItems

        case actionTypes.disableOrderNowButton:
            return {...state,disable:true}
        
        default:
            return state
    }
}


const ordersInitialState = {
    ordersList:[],
    spinner:true
}

export const ordersReducer  = (state=ordersInitialState,action)=>{
    switch(action.type){
        case actionTypes.getOrderDetails:{
            return {...state,ordersList:action.data,spinner:action.spinner}
        }
        case actionTypes.toggleSpinnerInOrders:{
            return {...state,spinner:action.spinner}
        }
        default:{
            return state
        }
    }
}

const loginInitialiser = {
    spinner:false,
    success:false
}

export const loginValidator = (state=loginInitialiser,action)=>{
    switch(action.type){
        case actionTypes.validateLoginSpinner:{
            return {...state,spinner:action.spinner}
        }

        case actionTypes.validateLoginSuccess:{
            return {...state,spinner:action.spinner,success:action.success}
        }
        default:
            return state
    }
}

const logSessionInitial = {
    loggedStatus:false
}

export const loggedSessionReducer = (state=logSessionInitial,action) => {
    switch(action.type){
        case actionTypes.toggleLoginSessionStorage:
            return {...state,loggedStatus:action.logged}
        default:
            return {...state}
    }
}