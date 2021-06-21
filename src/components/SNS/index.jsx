import React, { createContext, Fragment, memo, useCallback, useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import TimelineTab from './Timeline/timelineTab';
import AboutTab from './aboutTab';
import FriendsTab from './Friends/friendsTab';
import PhotosTab from './photosTab';
import { useSelector } from 'react-redux';
import url from '../../route/DevUrl';
import SNSNavbar from './Sections/SNSNavbar';
import { Link, Route } from 'react-router-dom';

export const SNSContext = createContext({
    userInfo :null,
})

const SocialApp = memo((props) => {
    const theme = props.match.params.theme
    const {user} = props;
    if(Object.keys(user).length === 0) return (<></>);
    const [profileBackground, setProfileBackground] = useState({
        padding:'0px',
        height: '470px',
        background : `url(${url}/${user.userData.backgroundImage}) center/cover no-repeat`,
    })
    const [profileImage, setprofileImage] = useState(user.userData.profileImage);
    const [userInfo, setUserInfo] = useState(user.userData);

    const renderTab = ()=>{
        switch (theme) {
            case 'list':
                return <TimelineTab/>
            case 'about':
                return <AboutTab/>
            case 'friends':
                return <FriendsTab/>
            case 'photo':
                return <PhotosTab/>
            default:
                return <TimelineTab/>
        }
    }


    const contextValue = {
        userInfo,
    }

    return (
        <SNSContext.Provider value={contextValue}>
            <Fragment>
                <Breadcrumb parent="SNS" title="BLUEBERRY TIME LINE" />
                <Container fluid={true}>
                    <div className="user-profile social-app-profile">
                        <Row>
                            <Col sm="12">
                                <Card className="hovercard text-center">
                                    <div style={profileBackground}></div>
                                    <div className="user-image">
                                        <div className="avatar">
                                            <Media body alt="user" src={`${url}/${profileImage}`}/>
                                        </div>
                                    </div>
                                    <div className="info market-tabs p-0">
                                        {/* 상부 나브텝 */}
                                        <SNSNavbar/>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        {renderTab()}
                        {/* <TabContent activeTab={activeTab} className="tab-content">
                            
                                {renderTab()}
                            
                            <TabPane tabId="1">
                                {props.children}
                                <TimelineTab />
                            </TabPane>
                            <TabPane tabId="2">
                                <AboutTab />
                            </TabPane>
                            <TabPane tabId="3">
                                <FriendsTab />
                            </TabPane>
                            <TabPane tabId="4">
                                <PhotosTab />
                            </TabPane>
                        </TabContent> */}
                    </div>
                </Container>
            </Fragment>
        </SNSContext.Provider>
    );


});

export default SocialApp;