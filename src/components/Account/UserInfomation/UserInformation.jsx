import React, { Fragment, useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, Media, Button, CardBody } from 'reactstrap'

import UserProfileImage from './Sections/UserProfileImage';
import UserBackgroundImage from './Sections/UserBackgroundImage';
import UserInfoFirst from './Sections/UserInfoFirst';
import { useSelector } from 'react-redux';
import UserInfoSecond from './Sections/UserInfoSecond';
import UserInfoEditModal from './Sections/UserInfoEditModal';
import { getFriendsList, getUserInfo, getUserMediaList, setFriendAdd, setFriendDelete } from '../../../utils/commonMethod';
import { confirmMessage, errorMessage, successMessage } from '../../../utils/alertMethod';
import UserPasswordChange from './Sections/UserPasswordChange';
import { Space } from 'antd';
import UserPhotos from './Sections/UserPhotos';
const UserInformation = (props) => {
  const user = useSelector(state => state.user);
  const userId = props.match.params.userId;
  const [userInfo, setUserInfo] = useState();
  const [profileEditModal, setProfileEditModal] = useState(false);
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);

  const [self, setSelf] = useState(false);
  const [friend, setFriend] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const [mediaHasMore, setMediaHasMore] = useState(true)
  const targetID = useRef(userId);

  
  useEffect(() => {
    if(user.userData){
      if(!user.userData.isAuth) return false;
      if(userId === 'self'){
        targetID.current = user.userData._id;
      }else{
        targetID.current = userId;
      }
      getUserInfoHandler(targetID.current);
      getUserMediaHandler(targetID.current);
    }
  }, [user,userId]);

  const getUserInfoHandler =(userId)=>{
    const body ={ userId };
    getUserInfo(body)
    .then(info=>{
      setUserInfo(info)
      if(user.userData._id === info._id){ //본인인지 아닌지
        setSelf(true)
      }else{
        setSelf(false)
        getFriendsList(3) //친구인지 확인
        .then(list=>{
          let user = list.filter(x=>x._id === userId);
          if(user.length > 0){
            setFriend(true);
          }else{
            setFriend(false);
          }

        })
      }
    })
    .catch(err=>{
      errorMessage('유저정보를 불러오는데 오류가 발생하였습니다.')
    })

  }
  const onFriendAdd =()=>{
      let body = { target : userId }
      setFriendAdd(body)
      .then(response=>{
          if(response.data.success){
              successMessage('친구 신청을 완료 했습니다.')
          }
      })
      .catch(err=>{
          errorMessage("친구 신청중 오류가 발생하였습니다.")
      })
  }

  const onFriendDelete=()=>{
    confirmMessage("해당 친구를 목록에서 삭제합니다.","실행","취소",()=>{
      let body = { target : userId }
        setFriendDelete(body)
        .then(success=>{
            successMessage('친구 목록에서 삭제 됩니다.')
            setFriend(false);
        })
        .catch(err=>{
            errorMessage("통신 중 오류가 발생하였습니다.");
        })
    })
  }
  const getUserMediaHandler =(id)=>{
    const body ={
      userId:id,
      skip,
      limit
    }
    getUserMediaList(body)
    .then(list=>{

      setMediaList([...mediaList,...list]);
      setSkip(skip+limit);

      if([...mediaList,...list].length < skip+limit){
        setMediaHasMore(false)
      }
    })
    .catch(err=>{
      errorMessage("회원 사진 정보를 불러오는데 오류가 발생하였습니다.")
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
                  <UserBackgroundImage self={self} imageUrl={userInfo.backgroundImage}/>
                  <UserProfileImage self={self} imageUrl={userInfo.profileImage}/>
                  <div className="info">
                    <UserInfoFirst  nickName={userInfo.nickName} name={userInfo.name} email={userInfo.email} phoneNumber = {userInfo.phoneNumber} bod={userInfo.birthDay} greeting={userInfo.greeting}/>
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
              self ?
                <Space size={10}>
                  <Button color="primary" onClick={()=>setProfileEditModal(true)}>프로필 수정</Button>
                  <Button color="secondary" onClick={()=>setPasswordChangeModal(true)}>비밀번호 변경</Button>
                </Space>
                :
                <Space size={10}>
                  {
                    friend ?
                      <Button color="primary" onClick={onFriendDelete}>친구 삭제</Button>
                      :
                      <Button color="primary" onClick={onFriendAdd}>친구 요청</Button>
                  }
                </Space>
            }
            
          </div>
          <Row >
            <Col sm="12">
                <Card>
                    <CardHeader>
                        <h5>{'회원 자료'}</h5>
                    </CardHeader>
                    <CardBody className="my-gallery row gallery-with-description">
                      
                    {mediaList.map((item,idx)=>(
                      <UserPhotos item={item}/>
                    ))}
                    <Row style={{width:'100%'}}>
                        <Col xs={12} style={{display:'grid', justifyContent:'center'}}>
                          {
                            mediaHasMore ? 
                            <a href={'javascript:void(0)'} onClick={()=>getUserMediaHandler(targetID.current)}>더보기</a>
                            :
                            <a href={'javascript:void(0)'} >모든 목록을 불러왔습니다.</a>
                          }
                          
                        </Col>
                      </Row>
                    </CardBody>
                </Card>
                
            </Col>
          </Row>
        </Container>
            <UserInfoEditModal isOpen = {profileEditModal} ModalHandler = {setProfileEditModal} item={userInfo}/>
            <UserPasswordChange isOpen = {passwordChangeModal} ModalHandler = {setPasswordChangeModal}/>
      </Fragment>
    }
    </>
    
  );
}

export default UserInformation;