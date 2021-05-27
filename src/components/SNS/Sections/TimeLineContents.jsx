import React, { memo, useContext, useState } from 'react'
import { Button, Card, CardBody, Col, Input, InputGroup, InputGroupAddon, Media, Row } from 'reactstrap'
import MainComment from './MainComment'
import SubComment from './SubComment'
import { MessageSquare, MoreVertical, ThumbsUp } from 'react-feather';
import url from '../../../route/DevUrl'
import { dateTimeToString } from '../../../utils/commonMethod';
import htmlParser from 'html-react-parser'
import { Divider } from 'antd';
import { SNSContext } from '..';

const TimeLineContents=memo((props) =>{
    const {userInfo} = useContext(SNSContext)
    const {contents} = props;
    const {writer} = contents;
    const [replyState, setReplyState] = useState(false);

    const onReplyHandler =()=>{
        setReplyState(true);
    }
    return (
        <Col sm="12">
            <Card>
                <CardBody>
                    <div className="new-users-social">
                        <Media>
                            <Media className="rounded-circle m-r-15" 
                            src={`${url}/${writer.profileImage}`} 
                            alt="" />
                            <Media body>
                                <h6 className="mb-0 f-w-700">
                                    {writer.name}
                                    </h6>
                                <p>{dateTimeToString(contents.createdAt,'ss')}</p>
                            </Media>
                            <span className="pull-right mt-0">
                                <MoreVertical />
                            </span>
                        </Media>
                    </div>
                    {
                        contents.mimetype.indexOf('image') > -1 ?
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Media className="img-fluid" alt="" 
                            // 사진 주소
                                src={`${url}/${contents.originalpath}`} 
                                style={{maxWidth:'100%', maxHeight:'550px'}}
                            />
                        </div>
                        :
                        <video 
                            style={{maxWidth:'100%', maxHeight:'550px'}}
                            src={`${url}/${contents.originalpath}`} 
                            controls
                        />
                    }
                    
                    <div className="timeline-content">
                        <div style={{width:'100%', maxHeight:'200px', whiteSpace:'nowrap', overflow:'auto'}} className="withoutScroll">
                            <p>
                                {htmlParser(contents.description)}
                            </p>
                        </div>
                        <Divider/>
                        <div className="like-content">
                            <span>
                                <i className="fa fa-heart font-danger"></i>
                                <span style={{marginLeft:'2px'}}>
                                    123
                                </span>
                            </span>
                            
                            
                            <span className="pull-right comment-number">
                                <span>
                                    댓글
                                </span>
                                <span style={{margin:'0px, 2px'}}>
                                    {"20"}
                                </span>
                                <span>
                                    개
                                </span>
                            </span>
                            {/* <span className="pull-right comment-number">
                                <span>
                                    {"10"} 
                                </span>
                                <span><i className="fa fa-comments-o"></i>
                                </span>
                            </span> */}
                        </div>
                        <Divider/>
                        <Row>
                            <Col sm={6}>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button color="transparent">
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <ThumbsUp/>좋아요
                                        </div>
                                    </Button>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button color="transparent" onClick={onReplyHandler}>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <MessageSquare/>댓글 달기
                                        </div>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        { replyState &&
                        <>
                        <Divider/>
                            <div className="social-chat">
                                {/* <MainComment/> */}
                                {/* <SubComment/> */}
                                <div className="text-center"><a href="#javascript">댓글 더보기</a></div>
                            </div>
                            <div className="comments-box">
                                <Media>
                                    <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={`${url}/${userInfo.profileImage}`} style={{height:'50px'}}/>
                                    <Media body>
                                        <InputGroup className="text-box">
                                            <Input className="form-control input-txt-bx" type="text" name="message-to-send" placeholder="Post Your commnets" />
                                            <InputGroupAddon addonType="append">
                                                <Button color="transparent"><i className="fa fa-smile-o">  </i></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Media>
                                </Media>
                            </div>
                        </>
                        }
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
})

export default TimeLineContents
