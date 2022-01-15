import { isEmpty } from "lodash";
import React,{useEffect} from "react";
import { useParams } from "react-router";
import {DetailHeading} from "../components/detailHeading"
import {DetailImage} from '../components/detailImage'
import {Spinner} from '../components/spinner'
import {connect} from 'react-redux'
import {getDetailProduct} from '../redux/thunk'
import {actionTypes} from '../redux/actionTypes'
import { DetailHeadingH5 } from "../components/DetailHeadingH5";
import {Button} from '../components/button'


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
            <Button cssName="m-2">Add To Cart</Button>
            </div>}
    </div>)
}

const mapStateToProps = (state)=>{
    return {
        spinner:state.detailProduct.spinner,
        product:state.detailProduct.product
    }
}

const mapDispatchToReducer = (dispatch) =>{
    return {
        getProductDetailData:(payload)=>{
            dispatch(getDetailProduct(payload))
        },
        clearProductDetailData:()=>{
            dispatch({type:actionTypes.clearDetailProduct})
        }
    }
}

export const Detail = connect(mapStateToProps,mapDispatchToReducer)(ProductDetail)