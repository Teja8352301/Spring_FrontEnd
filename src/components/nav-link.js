import { NavLink } from "react-router-dom"

export const Navlink = (props) =>{
    return <li className="nav-item"><NavLink activeClassName={props.activeCssName} className={props.cssName || ''+" nav-link custom_navlink p-2 mx-2"} to={props.path} exact={props.exactValue}>{props.children}</NavLink></li>
}