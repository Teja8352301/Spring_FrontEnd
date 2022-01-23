import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import { Button } from "../components/button";
import { Spinner } from "../components/spinner";
import { actionTypes } from "../redux/actionTypes";
import {getOrder } from "../redux/thunk";
import {DetailHeading} from '../components/detailHeading'
import { Modaal } from "../components/modal";


export const OrdersList = (props)=>{

    const [showModal,setShowModal] = useState(false)
    const [modalOrder,showModalOrder] = useState('')

    const showModalMethod = (id)=>{
        showModalOrder(id)
        setShowModal(true)
    }

    const hideModalMethod = ()=>{
        showModalOrder('')
        setShowModal(false)
    }

    useEffect(()=>{
        let payload={}
        payload['method'] = 'GET'
        payload['url'] = 'order/getOrders'
        props.getOrdersList(payload)
    },[])
    console.log(props)
    return(<>
    {props.orderList && props.orderList.ordersList && props.orderList.ordersList.length>0 &&  !props.orderList.spinner? 
    <>
    {  
    showModal?<Modaal showModal={showModal} modalOrder={modalOrder} hideModalMethod={hideModalMethod} />:null}
    
        {props.orderList.ordersList.map((orderItem,index)=>{ return <div key={index}><Button cssName={'d-block m-3 p-2'} clicking={()=>{showModalMethod(orderItem.orderId)}}> orderId : {orderItem.orderId}</Button></div>})}
    </>
    : props.orderList && props.orderList.ordersList && props.orderList.ordersList.length>0 &&  !props.orderList.spinner? 
    <h1 className="font-color">No Items Found</h1> : <Spinner/>
}
    </>)

}

const mapStateToProps = (state)=>{
    return {
        orderList:state.orders
    }
}

const dispatchReducerToProps = (dispatch)=>{
    return {
        getOrdersList:(apiPayload)=>{
           dispatch(getOrder(apiPayload)) 
        }
    }
}

export const Orders = connect(mapStateToProps,dispatchReducerToProps)(OrdersList)