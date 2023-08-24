import React, { useState } from 'react';
import './App.css';
import SidebarSignedIn from './components/sidebarsignedin';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Signin from './components/signin';
import Navbar from './components/navbar';
import Infobar from './components/infobar';
import Register from './components/register';
import { collection, doc, getDoc } from 'firebase/firestore';
import {db} from './firebase-config';


var init = 0;
function App() {
  const usersCollectionRef = collection(db,"users");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [state, setState] = useState(0);
  const [isSigninVisible, setIsSigninVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);


  const receiveMessageFromMain = (message) => {
    console.log('message from main',message);
    if(message == 'showSignin'){
      setIsSigninVisible(!isSigninVisible);
      console.log('hi',isSigninVisible);
    }
  };

  const receiveMessageFromSidebar = (message) => {
    console.log('message',message);
    if(message == 'profile'){
      setIsSigninVisible(true);
    }
    if(message == 'signIn'){
      setIsSigninVisible(true);
      setIsRegisterVisible(false);
    }
    if(message == 'register'){
      setIsRegisterVisible(true);
      setIsSigninVisible(false);
    }
    if(message == 'logout'){
      console.log('logout clicked');
      localStorage.setItem('signedIn',false);
      localStorage.setItem('username','');
      setIsSignedIn(false);
    }
  };

  const receiveMessageFromSignin = (message) => {
    console.log('message',message);
      if(message == 'openRegister'){
        setIsSigninVisible(false);
        setIsRegisterVisible(true);
      }
      if(message == 'signedIn'){
        setIsSigninVisible(false);
        getUserData(localStorage.getItem('email'));
      }
      if(message == 'close'){
        setIsSigninVisible(false);
        setIsRegisterVisible(false);
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
    console.log('getting user data');
    var user = await getDoc(doc(usersCollectionRef, email));
    if(user.exists()){
      var userData = user.data();
      console.log('userdata',userData);
      localStorage.setItem('username',userData.username);
      localStorage.setItem('displayname',userData.displayname);
      
      userWasSignedIn();
    }
    
  }

  function userWasSignedIn(){
    setIsSignedIn(true);
    console.log('SIGNED IN!');
    setState(state+1);
  }

  function checkIfSignedIn(){
    console.log(localStorage);
    if(localStorage.signedIn == 'true'){
      getUserData(localStorage.email)
      setIsSignedIn(true);
    }
  }
  if(init == 0){
    checkIfSignedIn();
    init = 1;
  }
  return (
    <div className='appWrapper'>
      <div id='notificationBar'>
        test
      </div>
      <Navbar/>
      {localStorage.getItem('username')?
      <div id='welcomeMessage'>Welcome {localStorage.username}!</div>
      :''}
      <div className='appCont'>
        <div id='desktopSidebar'>
          {localStorage.getItem('username')?
          <SidebarSignedIn onSendMessageToSidebar={receiveMessageFromSidebar} />
          :
          <Sidebar onSendMessageToSidebar={receiveMessageFromSidebar} />
          }
        </div>
        <Main  onSendMessage={receiveMessageFromMain} />
        {isSigninVisible === true?<Signin onSendMessageToSignin={receiveMessageFromSignin} />:''}
        {isRegisterVisible === true?<Register onSendMessageToRegister={receiveMessageFromRegister} />:''}
        <div id='desktopInfobar'>
          <Infobar/>
        </div>
      </div>
      <div id='mobileSidebar'>
      {localStorage.getItem('username')?
        <SidebarSignedIn onSendMessageToSidebar={receiveMessageFromSidebar} />
        :
        <Sidebar onSendMessageToSidebar={receiveMessageFromSidebar} />
        }
      </div>
    </div>
  );
}

export default App;
