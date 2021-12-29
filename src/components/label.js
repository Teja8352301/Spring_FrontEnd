import React from "react";

export const Label = (props) =>{
    return <label htmlFor={props.for} className={"m-2 custom_label"}>{props.children}</label>
}