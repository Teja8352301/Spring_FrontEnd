import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {Navlink} from '../components/nav-link'
import {sessionSave,clearCookie} from '../utils/utils'

export const Navlinking = (props) =>{
    return (<ul className="nav d-flex custom_links">
        <Navlink path="/shop">Shop</Navlink>
        {props.sessionLogged?
        <>
        <Navlink path="/cart">Cart</Navlink>
        <Navlink path="/orders">Orders</Navlink>
        <Navlink path="/admin/addproduct">Add Product</Navlink>
        <Navlink path="/admin/products">Admin Products</Navlink>
        <button className="nav-item nav-link custom_navlink p-2 mx-2" style={{backgroundColor:'transparent',border:'none'}} onClick={(e)=>{logoutMethod(e)}}>Log Out</button>
        </>:<>
        <Navlink path="/login">Login</Navlink>
        <Navlink path="/signup">Signup</Navlink>
        </>}
        </ul>)
}

const logoutMethod = (e) =>{
    e.preventDefault();
    sessionSave("auth_logged","false");
    clearCookie("authid")
    clearCookie("jwt_token");
    // <Redirect path="/shop"/>
}

const mapStateToProps = (state)=>{
    return {
        sessionLogged:state.logged && state.logged.loggedStatus || false
    }
}

export const Navlinks = connect(mapStateToProps)(Navlinking)