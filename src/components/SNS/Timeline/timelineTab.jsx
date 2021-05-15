import React, { Fragment, useContext } from 'react';
import {Row,Col,Card,CardBody,Button,Media,InputGroup, InputGroupAddon,Input} from 'reactstrap';
import one from "../../../assets/images/user/1.jpg";
import timeline1 from "../../../assets/images/social-app/timeline-1.png";
import timeline2 from "../../../assets/images/social-app/timeline-2.png";
import { MoreVertical } from 'react-feather';
import LeftBar from '../SideBar/leftBar';
import RightBar from '../SideBar/rightBar';
import { ELANA,JasonBorne,AlexendraDhadio,OliviaJon,IssaBell,MoreCommnets } from "../../../constant";
import TimeLineContents from '../Sections/TimeLineContents';
import { SNSContext } from '..';


const TimelineTab = () => {
    const {timeLineList} = useContext(SNSContext);
    
    return (
        <Fragment>
        <Row>
            <Col xl="3 xl-40 box-col-4" lg="12" md="5">
                <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc4">
                    <Row>
                        <LeftBar />
                    </Row>
                </div>
            </Col>
            <Col xl="6 xl-60 box-col-8" lg="12" md="7">
                <Row>
                    {
                        timeLineList.length > 0
                        ?
                            timeLineList.map(item=>{
                                return <TimeLineContents contents ={item} key={item._id}/>;
                            })
                        :
                            <div>
                                공개된 파일이 없습니다.
                            </div>
                    }
                </Row>
            </Col>
            <Col xl="3 xl-100 box-col-12">
                    <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc1">
                        <Row>
                            <RightBar />
                        </Row>
                    </div>
                </Col>
        </Row>
        </Fragment>
    );
};

export default TimelineTab;