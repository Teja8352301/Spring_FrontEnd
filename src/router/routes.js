import React from "react";
import { Route,Switch } from "react-router-dom";
import { Cart } from "../containers/cart";
import {AddProduct} from '../containers/add-product'
import Shop from "../containers/shop";
import {Redirect} from 'react-router'
import {Detail} from '../containers/detail'
import {AdminProduct} from '../containers/admin-products'
import { Orders } from "../containers/orders";
import {SignUp} from "../containers/sign-up";
import {Login} from '../containers/login'
import {connect} from 'react-redux'




export const Routing = (props) =>{
    return <div>
        <Switch>
            <Redirect to="/shop" from="/" exact/>
            <Route path="/shop"><Shop/></Route>
            <Route path="/detail/:productId"><Detail/></Route>
            {props.sessionLogged ?
            autherizedRoutes():unauthorizedRoutes()}
        </Switch> 
    </div>
}

const autherizedRoutes = () =>{
    return (
        <>
        <Route path="/cart"><Cart/></Route>
            <Route path="/orders"><Orders/></Route>
            <Route path="/admin/products"><AdminProduct/></Route>
            <Route path="/admin/addproduct/:productId"><AddProduct/></Route>
            <Route path="/admin/addproduct"><AddProduct/></Route>
        </>
    )
} 

const unauthorizedRoutes = () =>{
    return <>
            <Route path="/login"><Login/></Route>
            <Route path = "/signup"><SignUp/></Route>
    </>
}

const mapStateToProps = (state)=>{
    return {
        sessionLogged:state.logged && state.logged.loggedStatus || false
    }
}

export const Routes = connect(mapStateToProps)(Routing)