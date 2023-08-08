import React from "react";
import "./signin.css";

const Signin = ({onSendMessageToSignin}) => {
  // const [messageFromChild, setMessageFromChild] = useState('');
  console.log('Signin Recieved...',onSendMessageToSignin)

  const closeModal = () => {
    const type = 'signinToggle';
    console.log('from sifgnin');
    onSendMessageToSignin('toggleSignin'); // Call the callback function with the message
  };

  const openRegister = () => {
    const type = 'openRegister';
    console.log('from sifgnin');
    onSendMessageToSignin('openRegister'); // Call the callback function with the message
  };


  return (
  <div className='signInModal'>
    <div></div>
    <div className='title'>
      Sign In
    </div>
    <div className="label">Email</div>
    <input placeholder="Email"></input>
    <div className="label">Password</div>
    <input placeholder="Password"></input>
    <button>Sign In</button>
    <div className="cancel" onClick={closeModal}>Cancel</div>
    <div className="cancel" onClick={openRegister}>Sign Up</div>
  </div>
);
}

export default Signin