import React from "react";

export const Input = (props) =>{
    return <input className={props.cssName+" "+"custom_input"} type={props.type} value={props.value} id={props.for} onChange={(e)=>{props.fieldsChange(e)}}/>
}