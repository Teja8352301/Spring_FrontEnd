import React,{useEffect} from "react";
import {getTotalProducts,addToCart} from '../redux/thunk'
import {connect} from 'react-redux'
import { Card } from "../components/card";
import {Spinner} from '../components/spinner'
import { actionTypes } from "../redux/actionTypes";
import { useHistory } from "react-router";
import { isEmpty } from "lodash";



export const Shop = (props) =>{

    const history = useHistory();

    if(!isEmpty(props.totalProducts.details)){
        setTimeout(()=>{
            history.push(`/detail/${props.totalProducts.details}`)
        },3000)
    }

    useEffect(()=>{

        let payload = {};
        payload['method'] = 'GET'
        payload['url'] = 'products/getAllProducts'

        props.getProducts(payload)

        return ()=>{
            props.clearTotalProducts()
        }

    },[])

    const viewProducts = (totalData) =>{
        return totalData.products.map((product,index)=>{
            return <Card key={index} unique={index} product={product} activeAddToCart = {totalData.addToCart} 
            activeDetail={totalData.details} addToCart={props.addToCartMethod} addToDetail={props.addToDetailMethod} adminPage={false}/>
        })
    }
    
    return <div className={"d-flex justify-content-around flex-wrap "} >
        {
            props.totalProducts && props.totalProducts.products && !props.totalProducts.spinner ? viewProducts(props.totalProducts):<div className="d-flex align-items-center justify-content-center complete_view">
                <Spinner styling={{width:'60px',height:'60px',borderWidth:'10px'}}/>
                </div>
        }
        </div>
}

const mapStateToProps = (state) =>{
    return {
        totalProducts:state.totalProducts
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getProducts:(apiPayload)=>{
            dispatch(getTotalProducts(apiPayload))
        },
        addToCartMethod:(id)=>{
            dispatch({type:actionTypes.totalProductsAddtoCart,id:id})
            dispatch(addToCart(addToCartPayloadConstruction(id),actionTypes.clearTotalProductsAddToCart))
        },
        addToDetailMethod:(id)=>{
            dispatch({type:actionTypes.totalProductsDetails,id:id})
        },
        clearTotalProducts:()=>{
            dispatch({type:actionTypes.clearTotalProducts})
        }
    }
}

export let addToCartPayloadConstruction = (productId)=>{
    let payload = {}
    payload['method'] = 'POST'
    payload['url'] = 'cart/addToCart'
    payload['body'] = {
        productId:productId
    }

    return payload
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop)