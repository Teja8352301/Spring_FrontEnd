import React,{useMemo, useState} from "react";
import {connect} from 'react-redux'
import {Label} from '../components/label'
import {Input} from '../components/input'
import {Button} from '../components/button'
import {addProductService} from '../redux/thunk'
// import { isEmpty } from "lodash";
import {Spinner} from '../components/spinner'

const AddProducts = (props) =>{

    let initialState = {
        title:'',
        imageUrl:'',
        price:0,
        description:'',
    }
    
    const [product,setProduct] = useState(initialState)

    useMemo(()=>{
        if(props.addProductSuccess){
            setProduct(initialState)
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

return <div className="outer-form col-lg-6">
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
    <Button type="submit" cssName={'formButton'} clicking = {savingProduct}>Add Product</Button>
    {props.spinnerBoolean?<Spinner/>:null}
</div>
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