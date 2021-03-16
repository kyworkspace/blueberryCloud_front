import React, { memo, useEffect, useState } from 'react'
import { Account, Admin, Inbox,Taskboard,LogOut } from '../../../constant'
import {User, Mail, FileText, LogIn} from 'react-feather'
import man from '../../../assets/images/dashboard/profile.jpg'
import emptyUser from '../../../assets/images/dashboard/emptyProfile.png'
import { useSelector } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { windowClickEvent } from '../EventListener/eventListener'

const UserDropdown= memo((props) => {

  const user = useSelector(state => state.user)
  const [userStatus, setUserStatus] = useState(false);
  const [name, setName] = useState("");
  

  useEffect(() => {
    console.log(user.userData)
    if(user.userData){
      const {userData} = user;
      setName(userData.name);
      setUserStatus(true);
    }
    
    return () => {
    }
  }, [user])


  const onLogoutHandler = (e)=>{
    
  }
  const onLoginHandler =(e)=>{
    document.removeEventListener('click',windowClickEvent);
    props.history.push("/user/login")
  }
    return (
      <>
      {
      userStatus ?
      <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={emptyUser} alt="" />
              <div className="media-body"><span>{name}</span>
                <p className="mb-0 font-roboto">{'일반 사용자'} <i className="middle fa fa-angle-down"></i></p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li><User /><span>{Account} </span></li>
              <li><Mail /><span>{Inbox}</span></li>
              <li><FileText /><span>{Taskboard}</span></li>
              <li onClick={onLogoutHandler}><LogIn /><span>{LogOut}</span></li>
            </ul>
          </li>
          :
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={emptyUser} alt="" />
              <div className="media-body"><span>{'비회원'}</span>
                <p className="mb-0 font-roboto">{'로그인이 필요합니다.'} <i className="middle fa fa-angle-down"></i></p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li onClick={onLoginHandler}><LogIn /><span>{'Log In'}</span></li>
            </ul>
          </li>
      }
      </>
        
    )
})

export default withRouter(UserDropdown)
