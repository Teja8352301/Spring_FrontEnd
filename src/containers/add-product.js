import React,{useEffect, useMemo, useState} from "react";
import {connect} from 'react-redux'
import {Label} from '../components/label'
import {Input} from '../components/input'
import {Button} from '../components/button'
import {addProductService} from '../redux/thunk'
import {useHistory, useParams} from 'react-router'
// import { isEmpty } from "lodash";
import {Spinner} from '../components/spinner'
import axiosInstance from "../axiosInstance";
import { isEmpty } from "lodash";

const AddProducts = (props) =>{

    const params = useParams()
    const productId = params.productId

    let initialState = {
        title:'',
        imageUrl:'',
        price:0,
        description:'',
    }

    
    const [product,setProduct] = useState(initialState)

    useEffect(()=>{
        if(!isEmpty(productId)){
        let payload={}
        payload['method'] = 'GET'
        payload['url'] = `products/product/${productId}`
        axiosInstance(payload).then(res=>{
            let resData = res.data
            setProduct({
                title:resData.title || '',
                price:resData.price || 0,
                description:resData.description || '',
                imageUrl:resData.imageUrl || '',
                id:productId
            })
        })
    }
    },[])


    const addProductUI = () =>{
        return (<div className="outer-form col-lg-6">
    <div className="form-group mx-2 my-1">
    <Label for="title">Title</Label>
    <Input cssName={'form-control'} for="title" value={product['title']} type={"text"} fieldsChange = {fieldsChange}/> 
    </div>

    <div className="form-group  mx-2">
    <Label for="imageUrl">Image Url</Label>
    <Input cssName={'form-control'} for="imageUrl" value={product['imageUrl']} type={"text"} fieldsChange = {fieldsChange}/> 
    </div>

    <div className="form-group mx-2">
    <Label for="price">Price</Label>
    <Input cssName={'form-control'} for="price" value={product['price']} type={"number"} fieldsChange = {fieldsChange}/> 
    </div>

    <div className="form-group mx-2">
    <Label for="description">Description</Label>
    <Input cssName={'form-control'} for="description" value={product['description']} type={"text"} fieldsChange = {fieldsChange}/> 
    </div>
    <Button type="submit" cssName={'formButton'} clicking = {savingProduct}>{!isEmpty(product['id'])?'Update Product':'Add Product'}</Button>
    {props.spinnerBoolean?<Spinner/>:null}
</div>)
    }
   
    
    let history = useHistory()

    useMemo(()=>{
        if(props.addProductSuccess){
            history.push('/shop')
        }
    },[props.addProductSuccess])
   

    // const [errMessage,setErrorMessage] = useState('')

    const fieldsChange = (e) =>{
        let field =e.target.id
        let newProduct = {...product}
        newProduct[field] = parseInt(e.target.value) || e.target.value
        setProduct(newProduct)
    }

    const savingProduct = () =>{
            let payload = {}
                payload['method'] = 'POST'
                payload['body'] = product
                payload['url'] = 'products/addProduct'
                props.addProduct(payload)
    }

return <> 
{!isEmpty(productId) ?
isEmpty(product['id']) 
? <Spinner/> 
: addProductUI()
 : addProductUI()
}
</>
}

const mapStateToProps = (state) =>{
    return {
        spinnerBoolean:state.addProduct.spinner,
        addProductSuccess:state.addProduct.success
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        addProduct:(payload)=>{
            dispatch(addProductService(payload))
        }
    }
}

export const AddProduct = connect(mapStateToProps,mapDispatchToProps)(AddProducts)