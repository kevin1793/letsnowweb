import React from "react";
import "./register.css";
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import {db} from './../firebase-config';

const auth = getAuth();

const Register = ({onSendMessageToRegister}) => {
  console.log('Register Recieved...',onSendMessageToRegister)
  const usersCollectionRef = collection(db,"users");
  const closeModal = () => {
    const type = 'registerToggle';
    console.log('from sifgnin');
    onSendMessageToRegister('toggleRegister'); // Call the callback function with the message
  };

  const openRegister = () => {
    onSendMessageToRegister('openSignin'); // Call the callback function with the message
  };

  async function signUpUser(signUp){
    console.log('signUpUser',signUp);
    try {
      await createUserWithEmailAndPassword(auth, signUp.email, signUp.pass1);
      // User signed up successfully
      try {
        await setDoc(doc(usersCollectionRef, signUp.email), {
          email: signUp.email,
          username: signUp.user,
          zip: signUp.zip,
        });
  
        signUpSuccess();
      } catch (error) {
        console.error('Error adding user data:', error.message);
      }
    } catch (error) {
      // Handle signup error
      console.error(error.message);
    }
  }

  function signUpSuccess(){
    var successHTML = document.getElementById('signUpSuccess');
    var signUpFormHTML = document.getElementById('signUpForm');
    console.log(successHTML.style.display = 'block');
    successHTML.style.display = 'block';
    signUpFormHTML.style.display = 'none';
  }

  function signUpClicked(){
    var signUp = {user:'',email:'',pass1:'',pass2:''};
    signUp.user = document.getElementById('username').value;
    signUp.email = document.getElementById('email').value;
    signUp.zip = document.getElementById('zip').value;
    signUp.pass1 = document.getElementById('password1').value;
    signUp.pass2 = document.getElementById('password2').value;


    // signUpSuccess();
    // return;

    var error = '';
    const regexEmail = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gm);
    const regexZip = new RegExp(/^\d{5}$/);
    if(!regexEmail.test(signUp.email)){
      error += 'Please enter a valid Email<br>';
    }
    if(signUp.pass1 == '' || signUp.pass1 != signUp.pass2){
      error += 'Please make sure Passwords are filled and match<br>';
    }
    if(signUp.user == ''){
      error += 'Please make sure Username is filled<br>';
    }
    if(!regexZip.test(signUp.zip)){
      error += 'Please make sure Zip is filled and valid<br>';
    }
    if(error){
      var errorHTML = document.getElementById('errorText');
      errorHTML.innerHTML = error;
      return;
    }
    
    signUpUser(signUp);
    console.log(signUp);
  }


  return (
  <div className='signInModal'>
    
    <div className='title'>
      Sign Up
    </div>
    <div id="signUpForm">
      <div id="errorText"></div>
      <div className="label">Email</div>
      <input id="email" placeholder="Email"></input>
      <div className="label">Username</div>
      <input  id="username"  placeholder="Username"></input>
      <div className="label">Zip Code</div>
      <input  id="zip"  placeholder="ex) 12345"></input>
      <div className="label">Password</div>
      <input  id="password1"  type="password" placeholder="Password"></input>
      <div className="label">Password (Again!)</div>
      <input  id="password2" type="password" placeholder="Password"></input>
      <button onClick={signUpClicked}>Sign Up</button>
    </div>
    <div id="signUpSuccess">
      Sign Up was successful! Sign In to start posting!
    </div>
    <div className="cancel" onClick={closeModal}>Cancel</div>
    <div className="cancel" onClick={openRegister}>Sign In</div>
  </div>
);
}

export default Register