import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Signin from './components/signin';
import Navbar from './components/navbar';
import Infobar from './components/infobar';
import Register from './components/register';
import { collection, doc, getDoc } from 'firebase/firestore';
import {db} from './firebase-config';

function App() {
  const usersCollectionRef = collection(db,"users");
  const [isSigninVisible, setIsSigninVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const receiveMessageFromMain = (message) => {
    console.log('message from main',message);
    if(message == 'showSignin'){
      setIsSigninVisible(!isSigninVisible);
      console.log('hi',isSigninVisible);
    }
  };

  const receiveMessageFromSignin = (message) => {
    console.log('message',message);
      // if(isSigninVisible != ''){
      //   setIsSigninVisible(false);
      // }
      if(message == 'openRegister'){
        setIsSigninVisible(false);
        setIsRegisterVisible(true);
      }
      if(message == 'signedIn'){
        setIsSigninVisible(false);
        getUserData(localStorage.getItem('email'));
      }
  };

  const receiveMessageFromRegister = (message) => {
    console.log('message',message);
    if(message == 'closeModal'){
      setIsSigninVisible(false);
      setIsRegisterVisible(false);
    }
    if(message == 'openSignin'){
      setIsSigninVisible(true);
      setIsRegisterVisible(false);
    }
  };

  async function getUserData(email){
    var user = await getDoc(doc(usersCollectionRef, email));
    localStorage.setItem('userData',user);
  }

  return (
    <div className='appWrapper'>
      <Navbar/>
      <div className='appCont'>
        <Sidebar/>
        <Main  onSendMessage={receiveMessageFromMain} />
        {isSigninVisible === true?<Signin onSendMessageToSignin={receiveMessageFromSignin} />:''}
        {isRegisterVisible === true?<Register onSendMessageToRegister={receiveMessageFromRegister} />:''}
        <Infobar/>
      </div>
    </div>
  );
}

export default App;
