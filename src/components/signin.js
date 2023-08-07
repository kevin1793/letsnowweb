import React from "react";
import "./signin.css";

const Signin = ({onSendMessage}) => {
  // const [messageFromChild, setMessageFromChild] = useState('');
  console.log('Signin Recieved...',onSendMessage)

  const sendMessageToParent = () => {
    const type = 'signinToggle';
    console.log('from sifgnin');
    onSendMessage('toggleSignin'); // Call the callback function with the message
  };

 var showModal = onSendMessage;

  if(showModal){
    return (
    <div className='signInModal'>
      <div></div>
      <div className='title'>
        Sign In
      </div>
      <input></input>
      <button>Sign In</button>
      <div onClick={sendMessageToParent}>Cancel</div>
    </div>
  );
  }else{
    return''
  }
}

export default Signin