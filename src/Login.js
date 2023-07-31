import React from 'react';
import { Button } from '@mui/material';
import { auth, provider } from './Firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import "./Login.css";

function Login() {
    const [{}, dispatch] = useStateValue();
    //Add Google Authentication
    const signIn = () =>{
        auth.signInWithPopup(provider).then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    }
    
    return (
        <div className='login'>
            <div className='login_container'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
                    alt='whatsapp-logo'
                />
                <div className='login_text'>
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
};

export default Login;