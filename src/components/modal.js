import React,{useEffect,useState} from "react";
import Modal from 'react-bootstrap/Modal'
import axiosInstance from "../axiosInstance";
import { Button } from "./button";
import { Spinner } from "./spinner";


export const Modaal = (props) => {

  const [orderItems,setOrderItem] = useState([])
  
  useEffect(()=>{
    if(props.modalOrder && props.modalOrder.length>0){
      let payload = {};
      payload['method'] = 'GET'
      payload['url'] = `order/detailOrder/${props.modalOrder}`
      axiosInstance(payload).then(res=>{
        let data = res.data;
        setOrderItem(data)
      })
    }
  },[])

    return (
      <>  
        <Modal show={props.showModal}>
          {orderItems && orderItems.length?
          <>
          <Modal.Header>Ordered Items:</Modal.Header>
          {
            orderItems.map((orderItem,index)=>{
          return (<div key={index}>
          <Modal.Body>
          <Modal.Title>Title : ${orderItem && orderItem.title}</Modal.Title>
            <Modal.Title>Price : ${orderItem && orderItem.price}</Modal.Title>
            <Modal.Title>quantity : {orderItem && orderItem.quantity}</Modal.Title>
          </Modal.Body>
          </div>)
          })
          }
          <Modal.Footer>
            <Button variant="secondary" clicking={props.hideModalMethod}>
              Close
            </Button>
          </Modal.Footer>
          </>
          : <div style={{height:'300px',width:'300px'}} className="d-flex align-items-center justify-content-center"><Spinner  styling={{width:'60px',height:'60px',borderWidth:'10px'}}/></div>}
        </Modal>
      </>
    );
  }