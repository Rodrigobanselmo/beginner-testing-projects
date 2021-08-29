import React, {useState,useRef} from 'react';
import { Base, Title,Form} from './SignCss';
import {textInputChange,handleValidUser,handlePasswordChange,confirmHandlePasswordChange} from '../../../services/StringHandle'
import Sign from './SignComp'
import useFade from '../../../hooks/useFadeInOut'


export default function SignIn() {

  const [error, setError] = useState('');
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({
    emailAddress: '',
    password: '',
    confirmPassword: '',
    warnMessage: {title:'',body:'',type:'none'},
    warnPassMessage: {title:'',body:'',type:'none'},
    warnConfirmMessage: {title:'',body:'',type:'none'},
});

  const inputPass = useRef(null);
  const inputConfirm = useRef(null);

  const [fade,change,fadeInOut] = useFade('Entrar')

  function onChangeAuth(message) {
    fadeInOut(()=>{
      setLogin(login==='login'?'register':login==='register'?false:'login')
    },
    message
    )
  }

  const handleSignIn = (event) => {
    event && event?.preventDefault && event.preventDefault();
    onChangeAuth('Entrar')
  };


  function onSetEmailAddress(value) {
    textInputChange(value,data,setData)
  }

  function onBlurEmail(value) {
    handleValidUser(value,data,setData)
  }

  function onSetPassword(value) {
    handlePasswordChange(value,data,setData)
  }

  function onSetConfirmPassword(value) {
    confirmHandlePasswordChange(value,data,setData)
  }

  return (
    <Sign >
    <Sign.VideoBackground/>
      <Sign.Logo/>
      <Form style={{transform: 'scale(0.9)'}} >
        <Title fade={fade}>{change}</Title>
        <Sign.Errors error={error}/>
        <Base 
          onSubmit={handleSignIn}
          method="POST"
        >
          <div style={{position:'relative'}}>
          <Sign.InputEmail
            data={data} 
            onSetEmailAddress={onSetEmailAddress} 
            onBlurEmail={onBlurEmail} 
            onKerPress={({key})=>key==='Enter' && inputPass.current.focus()}
            />
          <Sign.InputPass 
            inputPass={inputPass} 
            data={data}  
            login={login}
            onSetPassword={onSetPassword} 
            onKerPress={({key})=>key==='Enter' && (!login ? inputConfirm.current.focus() : handleSignIn())}
            />
          <Sign.InputConfirmPass 
            inputConfirm={inputConfirm} 
            data={data} 
            onSetConfirmPassword={onSetConfirmPassword} 
            login={login}
            />
          </div>
          <Sign.ContinueButton 
            handleSignIn={handleSignIn} 
            login={login}
            data={data}
          />
          <Sign.ForgotPassword
            login={login}
          />
        </Base>
        <Sign.Duvida/>
      </Form>
    </Sign>
  );
}





