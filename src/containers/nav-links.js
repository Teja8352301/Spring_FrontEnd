import React from "react";
import {Navlink} from '../components/nav-link'

export const Navlinks = () =>{
    return (<ul className="nav d-flex custom_links">
        <Navlink path="/shop">Shop</Navlink>
        <Navlink path="/cart">Cart</Navlink>
        <Navlink path="/orders">Orders</Navlink>
        <Navlink path="/admin/addproduct">Add Product</Navlink>
        <Navlink path="/admin/products">Admin Products</Navlink>
        </ul>)
}