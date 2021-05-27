import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {Row,Col,Card,CardBody,Button,Media,InputGroup, InputGroupAddon,Input} from 'reactstrap';
import one from "../../../assets/images/user/1.jpg";
import timeline1 from "../../../assets/images/social-app/timeline-1.png";
import timeline2 from "../../../assets/images/social-app/timeline-2.png";
import { MoreVertical } from 'react-feather';
import LeftBar from '../SideBar/leftBar';
import RightBar from '../SideBar/rightBar';
import { ELANA,JasonBorne,AlexendraDhadio,OliviaJon,IssaBell,MoreCommnets } from "../../../constant";
import TimeLineContents from '../Sections/TimeLineContents';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SNSContext } from '..';
import { getTimeLineList } from '../../../utils/commonMethod';
import { errorMessage } from '../../../utils/alertMethod';

const TimelineTab = () => {
    const [timeLineList, setTimeLineList] = useState([])
    const limitRef = useRef(10);
    const skipRef = useRef(0);
    const [hasMoreItem, setHasMoreItem] = useState(true);
    useEffect(() => {
        getSNSList();
    }, [])

    const getSNSList = () => {
        let body = {
            limit : limitRef.current,
            skip : skipRef.current,
        }
        console.log(timeLineList)
        getTimeLineList(body)
        .then(response=>{
            let newList = [...timeLineList,...response.data.list]
            setTimeLineList(newList);
            if([...timeLineList,...response.data.list].length < limitRef.current + skipRef.current){
                setHasMoreItem(false);
            }
            skipRef.current = limitRef.current + skipRef.current;
        }).catch(err=>{
            errorMessage('타임라인을 불러오는데 오류가 발생하였습니다.');
        })
    }

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
                <Row >
                
                    <div className="withoutScroll">
                    <InfiniteScroll
                        dataLength = {20}
                        next={getSNSList}
                        hasMore={hasMoreItem}
                        loader={<h4>다음 목록을 가져오는 중입니다.</h4>}
                        height={3000}
                        endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>모든 목록을 불러왔습니다.</b>
                        </p>
                        }
                    >
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
                    
                    </InfiniteScroll>
                    </div>
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