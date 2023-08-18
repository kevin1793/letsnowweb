import React, {useState,useRef} from "react";
import "./sidebar.css";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Sidebar = ({onSendMessageToSidebar}) => {
  const registerModal = () => {
    onSendMessageToSidebar('register'); // Call the callback function with the message
  };
  const signInModal = () => {
    onSendMessageToSidebar('signIn'); // Call the callback function with the message
  };

  return(
    <div id="sidebarWrapper">
      <div id="sidebarCont">
        <div id="" className='unSelectedContOption optionBox'  onClick={signInModal}>
          <LoginIcon  className='unselectedOption' id='sideOptionHome'/>
          <p>Sign In</p>
        </div>
        <div id=""  className='unSelectedContOption optionBox'  onClick={registerModal}>
          <PersonAddIcon className='unselectedOption' id='sideOptionProfile'/>
          <p>Register</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar