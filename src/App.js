// import logo from './assets/logo-64.png';
import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Signin from './components/signin';
import Register from './components/register';

function App() {

  const [isSigninVisible, setIsSigninVisible] = useState(true);
  const [isRegisterVisible, setIsRegisterVisible] = useState(true);

  const receiveMessageFromMain = (message) => {
    console.log('message from main',message);
    if(message == 'showSignin'){
      setIsSigninVisible(!isSigninVisible);
      console.log('hi',isSigninVisible);
    }
  };

  const receiveMessageFromSignin = (message) => {
    console.log('message',message);
      if(isSigninVisible != ''){
        setIsSigninVisible(false);
      }
      if(message == 'openRegister'){
        setIsSigninVisible(false);
        setIsRegisterVisible(true);
      }
  };

  const receiveMessageFromRegister = (message) => {
    console.log('message',message);
      if(isRegisterVisible != ''){
        setIsSigninVisible(false);
        setIsRegisterVisible(false);
      }
      if(message == 'openSignin'){
        setIsSigninVisible(true);
        setIsRegisterVisible(false);
      }
  };

  return (
    <div className='appWrapper'>

      <div className='wrapper'>
        <Sidebar/>
        <Main  onSendMessage={receiveMessageFromMain} />
        {isSigninVisible === true?<Signin onSendMessageToSignin={receiveMessageFromSignin} />:''}
        {isRegisterVisible === true?<Register onSendMessageToRegister={receiveMessageFromRegister} />:''}
      </div>
    </div>
  );
}

export default App;
