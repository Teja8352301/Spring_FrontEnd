import React,{useEffect} from "react";
import { connect } from "react-redux";
import { Button } from "../components/button";
import { Spinner } from "../components/spinner";
import { actionTypes } from "../redux/actionTypes";
import { loadCartItems } from "../redux/thunk";


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
                return <li key={index}>{product.productTitle}({product.quantity})</li>
            })}
            
        </ul>
        <Button cssName="mx-4">Order Now</Button>
    </div> : 
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
        }
    }
}

export const Cart = connect(mapStateToProps,mapDispatchToProps)(CartItem)