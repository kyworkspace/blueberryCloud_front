import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {Row,Col,Card,CardBody,Button,Media,InputGroup, InputGroupAddon,Input} from 'reactstrap';
import LeftBar from '../SideBar/leftBar';
import RightBar from '../SideBar/rightBar';
import TimeLineContents from '../Sections/TimeLineContents';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTimeLineList } from '../../../utils/commonMethod';
import { errorMessage } from '../../../utils/alertMethod';
import { useSelector } from 'react-redux';

const TimelineTab = () => {
    const [timeLineList, setTimeLineList] = useState([])
    const limitRef = useRef(10);
    const skipRef = useRef(0);
    const [hasMoreItem, setHasMoreItem] = useState(true);
    const user = useSelector(state => state.user);

    useEffect(() => {
        getSNSList();
    }, [])

    const getSNSList = () => {
        let body = {
            limit : limitRef.current,
            skip : skipRef.current,
        }
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
                        dataLength = {timeLineList.length}
                        next={getSNSList}
                        hasMore={hasMoreItem}
                        loader={
                            <div style={{width:'100%',display:'grid',justifyContent:'center'}}>
                                <h4>다음 목록을 가져오는 중입니다.</h4>
                            </div>
                        }
                        height={800}
                        endMessage={
                            <div style={{width:'100%',display:'grid',justifyContent:'center'}}>
                                <b>모든 목록을 불러왔습니다.</b>
                            </div>
                        }
                        style={{maxWidth:'100%'}}
                    >
                    {
                        timeLineList.length > 0
                        ?
                            timeLineList.map(item=>{
                                return <TimeLineContents contents ={item} key={item._id} userId={user.userData._id}/>;
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
                            {/* <RightBar /> */}
                        </Row>
                    </div>
                </Col>
        </Row>
        </Fragment>
    );
};

export default TimelineTab;