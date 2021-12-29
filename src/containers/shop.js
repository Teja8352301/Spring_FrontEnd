import React,{useEffect} from "react";
import {getTotalProducts} from '../redux/thunk'
import {connect} from 'react-redux'
import { Card } from "../components/card";
import {Spinner} from '../components/spinner'
import { actionTypes } from "../redux/actionTypes";
import { useHistory } from "react-router";
import { isEmpty } from "lodash";



export const Shop = (props) =>{

    const history = useHistory();

    if(!isEmpty(props.totalProducts.details)){
        history.push(`/detail/${props.totalProducts.details}`)
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
            activeDetail={totalData.details} addToCart={props.addToCartMethod} addToDetail={props.addToDetailMethod}/>
        })
    }
    
    return <div className={"d-flex justify-content-around flex-wrap "} >
        {
            props.totalProducts && props.totalProducts.products && !props.totalProducts.spinner ? viewProducts(props.totalProducts):<Spinner styling={{width:'100px',height:'100px',borderWidth:'10px'}}/>
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
        },
        addToDetailMethod:(id)=>{
            dispatch({type:actionTypes.totalProductsDetails,id:id})
        },
        clearTotalProducts:()=>{
            dispatch({type:actionTypes.clearTotalProducts})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop)