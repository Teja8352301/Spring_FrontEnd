import React from "react";

export const Button = (props) =>{
    return <button className={props.cssName+" "+"btn btn-custom p-2"} type={props.type} onClick={props.clicking}>{props.children}</button>
}