import React from "react";

export const DetailImage = (props) =>{
    return <img className={props.cssName} src={props.source} alt={props.alt ||'Broken Image'}/>
}