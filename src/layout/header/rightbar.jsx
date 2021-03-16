import React, { Fragment, useState, useEffect } from 'react';
import { Minimize, Search} from 'react-feather';
import Bookmark from "../../layout/bookmark"
import {
   translate,
} from 'react-switch-lang';
import MessageAlarm from './RigthBarSection/MessageAlarmComponent';
import UserDropdown from './RigthBarSection/UserDropdownComponent';
import ShoppingCart from './RigthBarSection/ShoppingCartComponent';
import LanguageSelectionComponent from './RigthBarSection/LanguageSelectionComponent';
import NotificationComponent from './RigthBarSection/NotificationComponent';

const Rightbar = (props) => {    
  const [searchresponsive, setSearchresponsive] = useState(false)
  
  const [moonlight, setMoonlight] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("layout_version") === "dark-only"){
      setMoonlight(true)
    }
  }, []);

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.add("open");
      document.querySelector(".more_lang").classList.remove("active");
    } else {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.remove("open");
    }
  }

  

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light)
      document.body.className = "light"
      localStorage.setItem('layout_version', 'light');
    } else {
      setMoonlight(!light)
      document.body.className = "dark-only"
      localStorage.setItem('layout_version', 'dark-only');
    }
  }

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          {/* <li className="language-nav">
              <LanguageSelectionComponent/>
          </li> */}
          <li><span className="header-search"><Search onClick={() => SeacrhResposive(searchresponsive)} /></span></li>
          <li className="onhover-dropdown">
            <NotificationComponent/>
          </li>
          <Bookmark/>
          <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}><i className={`fa ${moonlight ? 'fa-lightbulb-o' : 'fa-moon-o'}`}></i></div>
          </li>
          <ShoppingCart/>
          <MessageAlarm/>
          <li className="maximize"><a className="text-dark" href="#javascript" onClick={goFull}><Minimize /></a></li>
          <UserDropdown/>
        </ul>
      </div>
    </Fragment>

  );
}
export default translate(Rightbar);