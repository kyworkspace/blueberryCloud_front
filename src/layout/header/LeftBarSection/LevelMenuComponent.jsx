import React, {memo, useState} from 'react';
import {GitPullRequest, User, Users, UserMinus, UserCheck, Airplay, Zap,Heart,Inbox} from 'react-feather'
import {FileManager,SocialApp,UserEdit,UsersCards,UserProfile,KanbanBoard,Bookmark,LevelMenu} from '../../../constant'
const LevelMenuComponent=memo((props)=> {
    const [levelMenu, setLevelMenu] = useState(false)

    const OnLevelMenu = (menu) => {
        //document.querySelector(".mega-menu-container").classList.remove("d-block")
        setLevelMenu(!menu)
      }

    return (
        <li className="level-menu outside"><a className={levelMenu ? "nav-link active" : "nav-link"} href="#javascript" onClick={() => OnLevelMenu(levelMenu)}><Inbox/><span>{LevelMenu}</span></a>
            <ul className="header-level-menu menu-to-be-close" style={levelMenu ? { display: "" } : { display: "none" }}>
              <li><GitPullRequest/><span>{FileManager}</span></li>
              <li><a href="#javascript"><Users/><span>{"Users"}</span></a>
                <ul className="header-level-sub-menu">
                  <li><User/><span>{UserProfile}</span></li>
                  <li><UserMinus/><span>{UserEdit}</span></li>
                  <li><UserCheck/><span>{UsersCards}</span></li>
                </ul>
              </li>
              <li><Airplay/><span>{KanbanBoard}</span></li>
              <li><Heart/><span>{Bookmark}</span></li>
              <li><Zap/><span>{SocialApp}</span></li>
            </ul>
          </li>
    )
})

export default LevelMenuComponent
