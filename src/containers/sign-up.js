import React, { useState } from 'react'
import {Input} from '../components/input'
import {Label} from '../components/label'
import {Button} from '../components/button'
import { connect } from 'react-redux'


export const SignUps = (props) =>{

    const fieldsChange = (event,field)=>{
        let newSignUpState = {...signUpState}
        newSignUpState[field] = event.target.value;
        setSignUpState(newSignUpState)
    }

    const [signUpState,setSignUpState] = useState({
        email:'',
        password:''
    })
    return <div>
        
        {/* <div className="form-group mx-2 my-1">
    <Label for="fullname">Full Name:</Label>   
    <Input cssName={'form-control'} for="fullname" value={signUpState['fullname']} type={"text"} fieldsChange = {e=>{fieldsChange(e,'fullname')}} /> 
</div> */}

    <div className="form-group mx-2 my-1">
    <Label for="email">Email:</Label>
    <Input cssName={'form-control'} for="email" value={signUpState['email']} type={"email"} fieldsChange = {e=>{fieldsChange(e,'email')}}/> 
</div>
    <div className="form-group mx-2 my-1">
    <Label for="password">Password</Label>
    <Input cssName={'form-control'} for="password" value={signUpState['password']} type={"password"} fieldsChange = {e=>{fieldsChange(e,'password')}}/> 
</div>
    <Button cssName={'formButton'}>SignUp</Button>
    </div>
}

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        registerUser:(apiPayload)=>{
            
        }
    }
}

export const SignUp = connect(mapStateToProps,mapDispatchToProps)(SignUps)