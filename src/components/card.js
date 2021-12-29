import React from "react";
import { Button } from "./button";
import {Spinner} from './spinner'

export const Card = (props) =>{
    return(
            <div key={props.unique} className="card text-center col-lg-3 col-sm-12 m-4">
                <div className="card-header">
                    <h5 className="custom_heading">{props.product.title}</h5>
                </div>
                <div className="card-body">
                    <img className="w-100 custom_card_image" src={props.product.imageUrl} alt="card_image" />
                    <p className="custom_heading my-2">{props.product.description}</p>
                    <p className="font-color font-24">Price : ${props.product.price}</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-around">
                {props.activeAddToCart != props.product.id ? <Button clicking={(e)=>props.addToCart(props.product.id)} type="submit" cssName={'addToCart'}>Add To Cart</Button>:<Spinner/>}
                {props.activeDetail != props.product.id ? <Button clicking={(e)=>{props.addToDetail(props.product.id)}} type="submit" cssName={'details'}>Details</Button>:<Spinner/>}
                </div>
            </div>
    )
}