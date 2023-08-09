import React, {useState,useRef} from "react";
import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

function Sidebar(){
  const [activeIndex, setActiveIndex] = useState('Home');
  function optionClicked(e){
    console.log(e.currentTarget);
    if(e.currentTarget.className.includes('unSelectedContOption')){
      setActiveIndex(e.currentTarget.id)
    }
  }

  return(
    <div id="sidebarWrapper">
      <div id="sidebarCont">
        <div id="Home" className={`${activeIndex == 'Home' ? "selectedContOption" : "unSelectedContOption"}`}  onClick={(e) => optionClicked(e)}>
          <HomeIcon  className={`${activeIndex == 'Home' ? "selectedOption" : "unselectedOption"}`} id='sideOptionHome'/>
          <p>Home</p>
        </div>
        <div id="Profile"  className={`${activeIndex == 'Profile' ? "selectedContOption" : "unSelectedContOption"}`} onClick={(e) => optionClicked(e)}>
          <PersonIcon className={`${activeIndex == 'Profile' ? "selectedOption" : "unselectedOption"}`} id='sideOptionProfile'/>
          <p>Profile</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar