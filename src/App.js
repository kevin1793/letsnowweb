// import logo from './assets/logo-64.png';
import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Main from './components/main';
import Signin from './components/signin';

function App() {

  const [isComponentVisible, setIsComponentVisible] = useState('');

  const receiveMessageFromMain = (message) => {
    // console.log('message',message);
    // if(message == 'toggleSignin'){
    //   setIsComponentVisible((prevVisibility) => !prevVisibility);
    // }else if(message == 'showSignin'){
      if(isComponentVisible != ''){
        setIsComponentVisible(true);
      }
    // }
    
  };

  const receiveMessageFromSignin = (message) => {
    // console.log('message',message);
    // if(message == 'toggleSignin'){
      // setIsComponentVisible((prevVisibility) => !prevVisibility);
      if(isComponentVisible != ''){
        setIsComponentVisible(true);
      }
    // }else if(message == 'showSignin'){
      // setIsComponentVisible(true);
    // }
    
  };

  return (
    <div className='appWrapper'>

      <div className='wrapper'>
        <Sidebar/>
        <Main  onSendMessage={receiveMessageFromMain} />
        {/* RightSide */}
        <Signin  onSendMessage ={receiveMessageFromSignin} />
      </div>
    </div>
  );
}

export default App;
