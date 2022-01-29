import React, { useEffect, useState } from 'react'
import {Input} from '../components/input'
import {Label} from '../components/label'
import {Button} from '../components/button'
import {connect} from 'react-redux'
import { validateLogin } from '../redux/thunk'
import { Redirect } from 'react-router'


export const Logins = (props) =>{
    console.log(props.success)
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
    <div className="form-group mx-2 my-1">
    <Label for="email">Email:</Label>
    <Input cssName={'form-control'} for="email" value={signUpState['email']} type={"email"} fieldsChange = {e=>{fieldsChange(e,'email')}}/> 
</div>
    <div className="form-group mx-2 my-1">
    <Label for="password">Password</Label>
    <Input cssName={'form-control'} for="password" value={signUpState['password']} type={"password"} fieldsChange = {e=>{fieldsChange(e,'password')}}/> 
</div>
    <Button cssName={'formButton'} clicking={()=>{
        console.log(signUpState)
        props.validatingDispatcher(signUpState)}
        }>Login</Button>
    </div>
}

const mapStateToProps = (state)=>{
    return{spinner:state.login.spinner,success:state.login.success}
}

const mapDispatchToProps=(dispatch)=>{
    return {
        validatingDispatcher:(body)=>{
            let payload = {}
            payload['method'] = 'POST'
            payload['body'] = body
            payload['url']='user/validate'
            dispatch(validateLogin(payload))
        },
        eraseLoggedData:()=>{
            dispatch({type:"VALIDATE_LOGIN_SPINNER",success:false,spinner:false})
        }
    }
}

export const Login = connect(mapStateToProps,mapDispatchToProps)(Logins)