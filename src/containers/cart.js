import React,{useEffect} from "react";
import { connect } from "react-redux";
import { Button } from "../components/button";
import { Spinner } from "../components/spinner";
import { actionTypes } from "../redux/actionTypes";
import { loadCartItems, removeItemFromCart } from "../redux/thunk";
import {DetailHeading} from '../components/detailHeading'


const CartItem = (props) =>{
    useEffect(()=>{
        let payload = {}
        payload['url'] = 'cart/getCartProducts'
        payload['method'] = 'GET'
        props.loadCartItemsList(payload)

        return (()=>{
            props.clearCartItemsList()
        })
    },[])
    return (<>
    {props.products && props.products.length && !props.spinner?<div className=" m-3">
        <p className="font-28">The products found in the cart</p>
        <ul className="font-color font-24">
            {props.products.map((product,index)=>{
                let productId = product && product['productId'] && product['productId']['id'] || ''
                return <div key={index}>
                    <p key={index}>{product && product['productId'] && product['productId']['title']}({product.quantity})</p>
                    <p className={' d-inline-block p-2'} style={{border:'2px dotted #E0755E'}}>$ {product.price}</p> <Button clicking={()=>{props.deleteCartItemFromList(productId)}} cssName="mx-4 d-inline-block">Delete</Button>
                </div>
            })}
            
        </ul>
        <DetailHeading cssName={'m-3 font-color'}>Total Price : {props.products[0] && props.products[0].cartId && props.products[0].cartId['totalPrice'] || ''}</DetailHeading>
        <Button cssName="mx-4">Order Now</Button>
    </div> : !props.spinner && props.products.length == 0? <p className="font-28">The products found in the cart</p> :
    <div className="cart_outer"><Spinner styling={{width:'60px',height:'60px',borderWidth:'10px'}}/></div>
}</>)
}

const mapStateToProps = (state)=>{
    return{
        products:state.cartItems.cartitems,
        spinner:state.cartItems.spinner
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        loadCartItemsList:(payload)=>{
            dispatch(loadCartItems(payload))
        },
        clearCartItemsList:()=>{
            dispatch({type:actionTypes.clearCartItems})
        },
        deleteCartItemFromList:(id)=>{
            let payload={}
            payload['body']={productId:id}
            payload['method'] = 'DELETE'
            payload['url'] = 'cart/deleteFromCart'
            dispatch(removeItemFromCart(payload))
        }
    }
}

export const Cart = connect(mapStateToProps,mapDispatchToProps)(CartItem)