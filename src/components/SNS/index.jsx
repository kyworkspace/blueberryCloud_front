import React, { createContext, Fragment, memo, useCallback, useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, Media, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import TimelineTab from './Timeline/timelineTab';
import AboutTab from './aboutTab';
import FriendsTab from './friendsTab';
import PhotosTab from './photosTab';
import { useSelector } from 'react-redux';
import url from '../../route/DevUrl';
import SNSNavbar from './Sections/SNSNavbar';
import { getTimeLineList } from '../../utils/commonMethod';
import { errorMessage } from '../../utils/alertMethod';


export const SNSContext = createContext({
    activeTab : '0',
    userInfo :null,
    timeLineList:[],
    setActiveTab:()=>{},
})

const SocialApp = memo(() => {
    const [activeTab, setActiveTab] = useState('1');
    const user = useSelector(state => state.user);
    const [profileBackground, setProfileBackground] = useState({
        padding:'0px',
        height: '470px',
    })
    const [profileImage, setprofileImage] = useState();
    const [userInfo, setUserInfo] = useState();
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [timeLineList, setTimeLineList] = useState([])

    useEffect(() => {
        if(user.userData){
            setUserInfo(user.userData);
        }
    }, [user.userData]);

    useEffect(() => {
        if(userInfo){
            setProfileBackground({
                ...profileBackground,
                background : userInfo.backgroundImage ? `url(${url}/${userInfo.backgroundImage}) center/cover no-repeat`:`url(https://picsum.photos/1600/470)`,
            });
            setprofileImage(userInfo.profileImage);
            getSNSList();
        }
    }, [userInfo])

    const getSNSList = useCallback(
        (id) => {
            let body = {
                limit,
                skip,
                userId : userInfo._id
            }
            getTimeLineList(body)
            .then(response=>{
                console.log(response.data.list);
                setTimeLineList(response.data.list)
            }).catch(err=>{
                errorMessage('타임라인을 불러오는데 오류가 발생하였습니다.');
            })
        },
        [userInfo],
    )

    const contextValue = {
        activeTab,
        setActiveTab,
        userInfo,
        timeLineList,
    }

    if(user.userData){
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
                                                <Media body alt="user" src={profileImage?`${url}/${profileImage}`:'https://picsum.photos/100/100'} />
                                            </div>
                                        </div>
                                        <div className="info market-tabs p-0">
                                            {/* 상부 나브텝 */}
                                            <SNSNavbar/>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <TabContent activeTab={activeTab} className="tab-content">
                                <TabPane tabId="1">
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
                            </TabContent>
                        </div>
                    </Container>
                </Fragment>
            </SNSContext.Provider>
        );
    }else{
        return ( <div>로딩중</div>)
    }

});

export default SocialApp;