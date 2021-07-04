import React, { memo, useEffect, useState } from 'react'
import { Account, Admin, Inbox,Taskboard,LogOut } from '../../../constant'
import {User, Mail, FileText, LogIn} from 'react-feather'
import man from '../../../assets/images/dashboard/profile.jpg'
import { useDispatch, useSelector } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { windowClickEvent } from '../EventListener/eventListener'
import {logoutUser} from '../../../redux/user/_actions/user_actions'
import url from '../../../route/DevUrl';

const UserDropdownComponent= memo((props) => {

  const user = useSelector(state => state.user)
  const [userStatus, setUserStatus] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState(0);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const {userData} = user;
    if(userData){
      if(userData.error)
        return;
      setName(userData.name);
      setRole(userData.role)
      setUserStatus(true);
    }
    
    return () => {
    }
  }, [user])


  const onLogoutHandler = (e)=>{
    dispatch(logoutUser()).then(response=>{
      if(response.payload.success){
        gotoLogin();
      }else{
        alert("로그아웃 실패! 다시 시도해주세요")
      }
    })
  }
  const onLoginHandler =(e)=>{
    document.removeEventListener('click',windowClickEvent);
    gotoLogin()
  }
  const gotoLogin=()=>{
    props.history.push("/user/login")
  }
  const onAccountHandler =()=>{
    props.history.push("/sns/userinfo")
  }
    return (
      <>
      {
      userStatus &&
        <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={`${url}/${user.userData.profileImage}`} alt="" />
              <div className="media-body"><span>{name}</span>
                <p className="mb-0 font-roboto">
                  { role ?
                  '관리자'
                  :
                  '일반 사용자'
                  }
                  
                  <i className="middle fa fa-angle-down"/>
                </p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li onClick={onAccountHandler}><User /><span>{Account} </span></li>
              {/* <li><Mail /><span>{Inbox}</span></li>
              <li><FileText /><span>{Taskboard}</span></li> */}
              <li onClick={onLogoutHandler}><LogIn /><span>{LogOut}</span></li>
            </ul>
          </li>
      }
      </>
        
    )
})

export default withRouter(UserDropdownComponent)
