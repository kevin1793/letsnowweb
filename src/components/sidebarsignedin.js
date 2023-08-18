import React, {useState,useRef} from "react";
import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const SidebarSignedIn = ({onSendMessageToSidebar}) => {
  const [activeIndex, setActiveIndex] = useState('Home');

  function optionClicked(e){
    console.log(e.currentTarget);
    if(e.currentTarget.id == 'Logout'){
      onSendMessageToSidebar('logout');
    }else if(e.currentTarget.id == 'Profile'){
      // onSendMessageToSidebar('profile');
    }
    
    if(e.currentTarget.className.includes('unSelectedContOption')){
      setActiveIndex(e.currentTarget.id)
    }
  }

  return(
    <div id="sidebarWrapper">
      <div id="sidebarCont">
        <div id="Home" className={`optionBox ${activeIndex == 'Home' ? "selectedContOption" : "unSelectedContOption"}`}  onClick={(e) => optionClicked(e)}>
          <HomeIcon  className={`${activeIndex == 'Home' ? "selectedOption" : "unselectedOption"}`} id='sideOptionHome'/>
          <p>Home</p>
        </div>
        <div id="Profile"  className={` ${activeIndex == 'Profile' ? "selectedContOption" : "unSelectedContOption"} optionBox`} onClick={(e) => optionClicked(e)}>
          <PersonIcon className={`${activeIndex == 'Profile' ? "selectedOption" : "unselectedOption"}`} id='sideOptionProfile'/>
          <p>Profile</p>
        </div>
        <div id="Logout"  className={` ${activeIndex == 'Logout' ? "selectedContOption" : "unSelectedContOption"} optionBox`} onClick={(e) => optionClicked(e)}>
          <LogoutIcon className={`${activeIndex == 'Logout' ? "selectedOption" : "unselectedOption"}`} id='sideOptionProfile'/>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default SidebarSignedIn