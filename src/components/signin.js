import React from "react";
import "./signin.css";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const Signin = ({onSendMessageToSignin}) => {
  const closeModal = () => {
    onSendMessageToSignin('close'); // Call the callback function with the message
  };
  const openRegister = () => {
    onSendMessageToSignin('openRegister'); // Call the callback function with the message
  };
  async function signIn(){
    var email = document.getElementById('signInEmail').value;
    var pass = document.getElementById('signInPassword').value;

    var error = '';
    const regexEmail = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gm);
    if(!regexEmail.test(email)){
      error += 'Please enter a valid Email<br>';
    }
    if(pass == ''){
      error += 'Please enter your password<br>';
    }
    if(error){
      var errorHTML = document.getElementById('errorText');
      errorHTML.innerHTML = error;
      return;
    }
    try {
      await signInWithEmailAndPassword(auth,email,pass);
      localStorage.setItem('email',email);
      localStorage.setItem('signedIn',true);
      onSendMessageToSignin('signedIn');
    } catch (error) {
      var errorHTML = document.getElementById('errorText');
      errorHTML.innerHTML = 'Sign in failed.';
    }
  }

  return (
  <div className='signInModal'>
    <div></div>
    <div className='title'>
      Sign In
    </div>
    <div id="errorText"></div>
    <div className="label">Email</div>
    <input id="signInEmail" placeholder="Email"></input>
    <div className="label">Password</div>
    <input id="signInPassword" type="password" placeholder="Password"></input>
    <button onClick={signIn}>Sign In</button>
    <div className="cancel" onClick={closeModal}>Cancel</div>
    <div className="cancel" onClick={openRegister}>Register</div>
  </div>
);
}

export default Signin