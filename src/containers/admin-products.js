import React,{useEffect} from "react";
import {connect} from 'react-redux'
import { actionTypes } from "../redux/actionTypes";
import { useHistory } from "react-router";
import { isEmpty } from "lodash";
import {getAdminProducts,deleteAdminProduct} from '../redux/thunk'
import {Spinner} from '../components/spinner'
import { Card } from "../components/card";

const AdminProducts = (props) =>{

    const history = useHistory();

    if(!isEmpty(props.updateProduct)){
        setTimeout(()=>{
            history.push(`/admin/addproduct/${props.updateProduct}`)
        },3000)
    }

    useEffect(()=>{
        let payload = {};
        payload['method'] = 'GET'
        payload['url'] = 'products/getAllProducts'
        props.getProductsForAdmin(payload)

        return (()=>{
            props.clearProductsFromAdmin()
        })
    },[])

    const viewProducts = (totalData) =>{
        return totalData.products.map((product,index)=>{
            return <Card key={index} unique={index} product={product} updatedProduct = {props.updateProduct} deleteProduct={props.deleteProductId} 
            updateMethod = {props.addUpdateProduct} deleteMethod = {props.deleteAdminProduct} adminPage={true}
            />
        })
    }


    return (<div className={"d-flex justify-content-around flex-wrap "} >
    {
        props.adminProducts && props.adminProducts.products && !props.adminProducts.spinner ? viewProducts(props.adminProducts):<div className="d-flex align-items-center justify-content-center complete_view">
            <Spinner styling={{width:'60px',height:'60px',borderWidth:'10px'}}/>
            </div>
    }
    </div>)
}

const mapStateToProps = (state)=>{
    return {
        updateProduct:state.adminProducts.updateProduct,
        adminProducts:state.adminProducts,
        deleteProductId:state.adminProducts.deleteProduct
    }
}

const mapReducerToProps = (dispatch)=>{
    return{
        getProductsForAdmin:(payload)=>{
            dispatch(getAdminProducts(payload))
        },
        clearProductsFromAdmin:()=>{
            dispatch({type:actionTypes.clearAdminProducts})
        },
        addUpdateProduct:(productId)=>{
            dispatch({type:actionTypes.updateAdminProduct,updateId:productId})
        },
        deleteAdminProduct:(productId)=>{
            let payload = {}
            payload['method'] = 'DELETE'
            payload['url'] = `products/product/${productId}`
            payload['productId']  = productId
            dispatch(deleteAdminProduct(payload))
        }
    }
}

export const AdminProduct = connect(mapStateToProps,mapReducerToProps)(AdminProducts)

