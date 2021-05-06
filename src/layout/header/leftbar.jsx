import React, { Fragment, useState, useLayoutEffect, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap'
import { X, Layers, GitPullRequest, User, Users, UserMinus, UserCheck, Airplay, Zap,Heart,Inbox, Sliders } from 'react-feather'
import { Link } from 'react-router-dom'
import { errorPages, authPages, usefullPages, comingsoonPages } from './pages'
import {BonusUi,MegaMenu,ErrorPage,Authentication,UsefullPages,ComingSoon, FileManager,SocialApp,UserEdit,UsersCards,UserProfile,KanbanBoard,Bookmark,LevelMenu} from '../../constant'
import { windowClickEvent } from './EventListener/eventListener';
import LogoComponent from './LeftBarSection/LogoComponent';
import MegaMenuComponent from './LeftBarSection/MegaMenuComponent';
import LevelMenuComponent from './LeftBarSection/LevelMenuComponent';
const Leftbar = (props) => {

  
  const [sidebartoggle, setSidebartoggle] = useState(true)
  
  const width = useWindowSize()

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  const responsive_openCloseSidebar = (toggle) => {
    if(width <= 991){
      document.querySelector(".page-header").className = "page-header";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper "
    }else{
      if (toggle) {
        setSidebartoggle(!toggle);
        document.querySelector(".page-header").className = "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
        // document.querySelector(".mega-menu-container").classList.remove("d-block")
      } else {
        setSidebartoggle(!toggle);
        document.querySelector(".page-header").className = "page-header";
        document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper "
      }
    }
  };

  return (
    <Fragment>
      <div className="header-logo-wrapper" id="out_side_click">
        <div className="logo-wrapper">
          {/* 로고 부분 */}
          <LogoComponent/>
        </div>
        <div className="toggle-sidebar" onClick={() => responsive_openCloseSidebar(sidebartoggle)} style={window.innerWidth <= 991 ? {display:"block"} : {display:"none"}}>
          <Sliders className="status_toggle middle sidebar-toggle" id="sidebar-toggle" />
        </div>
      </div>
      <Col className="left-header horizontal-wrapper pl-0">
        <ul className="horizontal-menu">
          {/* 메가박스... 오른쪽 사이드에서 나오는 메뉴 */}
            {/* <MegaMenuComponent/> */}
          {/* LevelMenu */}
          {/* <LevelMenuComponent/> */}
        </ul>
      </Col>
    </Fragment>
  );
}

export default Leftbar;