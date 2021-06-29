import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, Media, Button } from 'reactstrap'

import UserProfileImage from './Sections/UserProfileImage';
import UserBackgroundImage from './Sections/UserBackgroundImage';
import UserInfoFirst from './Sections/UserInfoFirst';
import { useSelector } from 'react-redux';
import UserInfoSecond from './Sections/UserInfoSecond';
import UserInfoEditModal from './Sections/UserInfoEditModal';
import { getUserInfo } from '../../../utils/commonMethod';
import { errorMessage } from '../../../utils/alertMethod';
import UserPasswordChange from './Sections/UserPasswordChange';
import { Space } from 'antd';
const UserInformation = (props) => {
  const user = useSelector(state => state.user);
  const userId = props.match.params.userId;
  const [userInfo, setUserInfo] = useState();
  const [profileEditModal, setProfileEditModal] = useState(false);
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);
  
  useEffect(() => {
    if(user.userData){
      if(!user.userData.isAuth) return false;
      if(userId === 'self'){
        getUserInfoHandler(user.userData._id);
      }else{
        getUserInfoHandler(userId)
      }
    }
  }, [user]);
  const getUserInfoHandler =(userId)=>{
    const body ={
      userId
    }
    getUserInfo(body)
    .then(user=>{
      setUserInfo(user)
    })
    .catch(err=>{
      errorMessage('유저정보를 불러오는데 오류가 발생하였습니다.')
    })

  }
  
 
  return (
    <>
    {
      userInfo &&
      <Fragment>
        <Breadcrumb parent="Users" title="User Profile" />
        <Container fluid={true}>
          <div className="user-profile">
            <Row>
              <Col sm="12">
                <Card className="card hovercard text-center">
                  <UserBackgroundImage imageUrl={userInfo.backgroundImage}/>
                  <UserProfileImage imageUrl={userInfo.profileImage}/>
                  <div className="info">
                    <UserInfoFirst name={userInfo.name} email={userInfo.email} phoneNumber = {userInfo.phoneNumber} bod={userInfo.birthDay} greeting={userInfo.greeting}/>
                    <hr />
                    <UserInfoSecond/>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
          <div
            style={{width:'100%', display:'flex',justifyContent:'flex-end'}}
          > 
          {
              user.userData._id === userInfo._id &&
                <Space size={10}>
                  <Button color="primary" onClick={()=>setProfileEditModal(true)}>프로필 수정</Button>
                  <Button color="secondary" onClick={()=>setPasswordChangeModal(true)}>비밀번호 변경</Button>
                </Space>
            }
            
          </div>
          
        </Container>
        
            <UserInfoEditModal isOpen = {profileEditModal} ModalHandler = {setProfileEditModal} item={userInfo}/>
            <UserPasswordChange isOpen = {passwordChangeModal} ModalHandler = {setPasswordChangeModal}/>
          
      </Fragment>
    }
    </>
    
  );
}

export default UserInformation;