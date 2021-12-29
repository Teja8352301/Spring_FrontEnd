import React from "react";
import { Button } from "./button";

export const Cart = () =>{
    return <div className=" m-3">
        <p className="font-28">Cart Id:kdsndenfefmefkfhdskdnfndnsjfhkwj</p>
        <ul className="font-color font-24">
            <li>Pant(3)</li>
            <li>Jeans(3)</li>
            <li>Jeans(3)</li>
            <li>Jeans(3)</li>
        </ul>
        <Button cssName="mx-4">Order Now</Button>
    </div>
}