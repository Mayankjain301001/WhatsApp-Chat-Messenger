import React from 'react';
import './Login.css';
import { Button } from '@mui/material';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
  const [{},dispatch] = useStateValue();
  const signIn = ()=>{
    auth.signInWithPopup(provider).then((res)=>{
        dispatch(
          {
            type: actionTypes.SET_USER,
            user: res.user,
          }
        )
    }).catch(err=>{
        // alert(err.message);
        window.location.reload();
    })
  }
  return (
    <div className='login'>
        <div className='login__container'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" />
            <div className='login__text'>
                <h1>WhatsApp Messenger</h1>
            </div>
            <Button onClick={signIn}>
                Sign in With Google
            </Button>
            <div className='bbb'>Developed by: Mayank Jain</div>
        </div>
    </div>
  )
}

export default Login;