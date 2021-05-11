import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, Media, Button } from 'reactstrap'

import UserProfileImage from './Sections/UserProfileImage';
import UserBackgroundImage from './Sections/UserBackgroundImage';
import UserInfoFirst from './Sections/UserInfoFirst';
import { useSelector } from 'react-redux';
import UserInfoSecond from './Sections/UserInfoSecond';
const UserInformation = (props) => {
  const user = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState();
  
  useEffect(() => {
    if(user.userData){
      setUserInfo(user.userData);
    }
  }, [user]);
  
 
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
                    <UserInfoFirst name={userInfo.name} email={userInfo.email}/>
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
            <Button color="primary">프로필 수정</Button>
          </div>
          
        </Container>
        
      </Fragment>
    }
    </>
    
  );
}

export default UserInformation;