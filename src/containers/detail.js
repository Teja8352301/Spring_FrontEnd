import { isEmpty } from "lodash";
import React,{useEffect} from "react";
import { useParams } from "react-router";
import {DetailHeading} from "../components/detailHeading"
import {DetailImage} from '../components/detailImage'
import {Spinner} from '../components/spinner'
import {connect} from 'react-redux'
import {addToCart, getDetailProduct} from '../redux/thunk'
import {actionTypes} from '../redux/actionTypes'
import { DetailHeadingH5 } from "../components/DetailHeadingH5";
import {Button} from '../components/button'
import { addToCartPayloadConstruction } from "./shop";


const ProductDetail = (props) =>{
    const params = useParams()
    const productId = params.productId

    useEffect(()=>{
        let payload={}
        payload['method'] = 'GET'
        payload['url'] = `products/product/${productId}`
        props.getProductDetailData(payload)

        return ()=>{
            props.clearProductDetailData()
        }
    },[])

    return (<div>
        {isEmpty(props.product)?<div className="d-flex align-items-center justify-content-center complete_view"><Spinner styling={{width:'60px',height:'60px',borderWidth:'10px'}}/></div>:
        <div className="detail_div">
            <DetailHeading cssName={'font-color'}>{props.product && props.product.title || ""}</DetailHeading>
            <DetailImage cssName={'detail_Image'} source={props.product && props.product.imageUrl || ""}/>
            <DetailHeadingH5 cssName={'m-3 font-color'}>{props.product && props.product.description || ""}</DetailHeadingH5>
            <DetailHeadingH5 cssName={'m-3 font-color'}>${props.product && props.product.price || ""}</DetailHeadingH5>
            {props.addToCartSpinner? <Spinner/> :
            <Button cssName="m-2" clicking={()=>{props.addToCartMethod(props.product.id)}}>Add To Cart</Button>
        }
            </div>}
    </div>)
}

const mapStateToProps = (state)=>{
    return {
        spinner:state.detailProduct.spinner,
        product:state.detailProduct.product,
        addToCartSpinner:state.detailProduct.addToCartSpinner
    }
}

const mapDispatchToReducer = (dispatch) =>{
    return {
        getProductDetailData:(payload)=>{
            dispatch(getDetailProduct(payload))
        },
        clearProductDetailData:()=>{
            dispatch({type:actionTypes.clearDetailProduct})
        },
        addToCartMethod:(id)=>{
            dispatch({type:actionTypes.detailAddToCartProduct,id:id,spinner:true})
            dispatch(addToCart(addToCartPayloadConstruction(id),actionTypes.detailCartSpinner))
        }
    }
}


export const Detail = connect(mapStateToProps,mapDispatchToReducer)(ProductDetail)