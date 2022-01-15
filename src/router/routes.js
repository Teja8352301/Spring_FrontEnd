import React from "react";
import { Route,Switch } from "react-router-dom";
// import { Card } from "../components/card";
import { Cart } from "../components/cart";
import {AddProduct} from '../containers/add-product'
import Shop from "../containers/shop";
import {Redirect} from 'react-router'
import {Detail} from '../containers/detail'
import {AdminProduct} from '../containers/admin-products'



export const Routes = () =>{
    return <div>
        <Switch>
            <Redirect to="/shop" from="/" exact/>
            <Route path="/shop"><Shop/></Route>
            <Route path="/products"><h1>Products</h1></Route>
            <Route path="/cart"><Cart/></Route>
            <Route path="/orders"><h1>Orders</h1></Route>
            <Route path="/admin/products"><AdminProduct/></Route>
            <Route path="/admin/addproduct/:productId"><AddProduct/></Route>
            <Route path="/admin/addproduct"><AddProduct/></Route>
            <Route path="/detail/:productId"><Detail/></Route>
        </Switch> 
    </div>
}