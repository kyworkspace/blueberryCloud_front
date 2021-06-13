import React, { memo, useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, Media, Row } from 'reactstrap'
import MainComment from './MainComment'
import SubComment from './SubComment'
import { MessageSquare, MoreVertical, Send, ThumbsDown, ThumbsUp } from 'react-feather';
import url from '../../../route/DevUrl'
import { dateTimeToString,getDisLike,getLikes, commentPost, unDislike, unLike, upDisLike, upLike,getCommentList } from '../../../utils/commonMethod';
import htmlParser from 'html-react-parser'
import { Divider } from 'antd';
import { SNSContext } from '..';
import { errorMessage, infoMessage } from '../../../utils/alertMethod';

function TimeLineContents(props){
    const {userInfo} = useContext(SNSContext)
    const {contents} = props;
    const {writer} = contents;
    const [commentState, setCommentState] = useState(false);
    const [commentList, setCommentList] = useState([])
    const [commentContents, setCommentContents] = useState();
    const [commentCount, setCommentCount] = useState(3)

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);

    let body={ 
        contentsId : contents._id,
        userId : props.userId,
        userTo : writer._id
    };
    useEffect(() => {
         //좋아요 정보
         getLikes(body).then(list=>{
             //  1. 좋아요 숫자
             setLikes(list.length) //좋아요 갯수
             //  2. 내가 좋아요 눌렀는지 안눌렀는지
             list.map(like=>{
                 if(like.userId === props.userId){
                     setLikeAction('liked');
                 }
             })
         })
         .catch(err=>{
             errorMessage('좋아요 정보를 가져오지 못했습니다.')
         })
         getDisLike(body).then(list=>{
            setDislikes(list.length) 
            list.map(like=>{
                if(like.userId === props.userId){
                    setDislikeAction('disliked');
                }
            })
        })
        .catch(err=>{
            errorMessage('싫어요 정보를 가져오지 못했습니다.')
        });
        //댓글 목록 가져오기
        callCommentList();
    }, [Likes,Dislikes])

    const onReplyHandler =()=>{
        setCommentState(true);
    }
    const onLikeHandler = ()=>{
        if(LikeAction===null){ //좋아요가 눌러져 있지 않는 경우
            upLike(body)
            .then(data=>{
                setLikes(Likes+1);
                setLikeAction('liked');
                if(DislikeAction !==null){ //싫어요가 눌러져 있는 경우
                    setDislikeAction(null);
                    setDislikes(Dislikes-1);
                }
            })
            .catch(err=>{
                errorMessage("서버와 통신 중 오류가 발생하였습니다.")
            })
        }else{
            unLike(body)
            .then(data=>{
                setLikes(Likes-1);
                setLikeAction(null);
            })
            .catch(err=>{
                errorMessage("서버와 통신 중 오류가 발생하였습니다.")
            })
        }
    }
    const onDisLikeHandler= ()=>{
        if(DislikeAction === null){
            upDisLike(body)
            .then(data=>{
                setDislikes(Dislikes+1);
                setDislikeAction(null);
                if(LikeAction !==null){
                    setLikeAction(null);
                    setLikes(Likes-1);
                }
            })
            .catch(err=>{
                errorMessage("서버와 통신 중 오류가 발생하였습니다.")
            })
        }else{
            unDislike(body)
            .then(data=>{
                setDislikes(Dislikes-1);
                setDislikeAction(null);
            })
            .catch(err=>{
                errorMessage("서버와 통신 중 오류가 발생하였습니다.")
            })
        }
    }
    const onReplySubmit =(e)=>{
        e.preventDefault();
        body.content = commentContents;
        commentPost(body)
        .then(response=>{
            callCommentList();
            setCommentContents("");
        })
        .catch(err=>{
            infoMessage("댓글 작성에 오류가 발생하였습니다.")
        })
    }

    const callCommentList =()=>{
        getCommentList(body)
        .then(list=>{
            setCommentList(list)
        })
        .catch(err=>{
            infoMessage("댓글 목록을 불러오는데 오류가 발생하였습니다.");
        })
    }
    const onMoreCommentHandler = ()=>{
        setCommentCount(commentCount+10);
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
                                src={`${url}/${contents.logicPath}`} 
                                style={{maxWidth:'100%'}}
                            />
                        </div>
                        :
                        <video 
                            style={{maxWidth:'100%'}}
                            src={`${url}/${contents.logicPath}`} 
                            controls
                        />
                    }
                    
                    <div className="timeline-content">
                        <div style={{maxHeight:'200px', overflow:'auto'}}>
                                {htmlParser(contents.description)}
                        </div>
                        <Divider/>
                        <div className="like-content">
                            <span>
                                <i className="fa fa-heart font-danger"></i>
                                <span style={{marginLeft:'2px'}}>
                                    {Likes}
                                </span>
                            </span>
                            
                            
                            <span className="pull-right comment-number">
                                <span>
                                    댓글
                                </span>
                                <span style={{margin:'0px, 2px'}}>
                                    {commentList.length}
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
                            <Col xs={4}>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button color="transparent" onClick={onLikeHandler}>
                                        <Row>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <Col>
                                            <ThumbsUp 
                                                fill={LikeAction ==="liked" ? "blue" :"none"}
                                                fillOpacity = {0.5}
                                                color="blue"
                                            />
                                            </Col>
                                            <Col md={{hidden:true}} className="d-none d-sm-block d-md-block" >
                                                좋아요
                                            </Col>
                                        </div>
                                        </Row>
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button color="transparent" onClick={onDisLikeHandler}>
                                        <Row>
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                <Col>
                                                    <ThumbsDown
                                                        fill={DislikeAction ==="disliked" ? "red" :"none"}
                                                        fillOpacity = {0.5}
                                                        color="red"
                                                    />
                                                </Col>
                                                <Col md={{hidden:true}} className="d-none d-sm-block d-md-block" >
                                                    싫어요
                                                </Col>
                                            </div>
                                        </Row>
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button color="transparent" onClick={onReplyHandler}>
                                        <Row>
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                <Col>
                                                    <MessageSquare/>
                                                </Col>
                                                <Col md={{hidden:true}} className="d-none d-sm-block d-md-block" >
                                                댓글 달기
                                                </Col>
                                            </div>
                                        </Row>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        { commentState &&
                        <>
                        <Divider/>
                            <div className="social-chat">
                                {commentList.map((item,idx)=>
                                    {
                                        if(idx < commentCount){
                                            return <MainComment key = {item._id} item={item} refreshList={callCommentList}/>
                                        }
                                    }
                                )}
                                {/* <SubComment/> */}
                                {commentList.length > commentCount &&
                                    <div className="text-center"><a href="javascript:void(0)" onClick={onMoreCommentHandler}>댓글 더보기</a></div>
                                }
                                
                            </div>
                            <div className="comment-box">
                                <Media>
                                    <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={`${url}/${userInfo.profileImage}`} style={{height:'50px'}}/>
                                    <Media body>
                                        <Form onSubmit={onReplySubmit}>
                                            <InputGroup className="text-box" >
                                                <Input className="form-control input-txt-bx" type="text" name="message-to-send" placeholder="댓글을 입력해주세요" value={commentContents} onChange={(e)=>setCommentContents(e.currentTarget.value)}/>
                                                <InputGroupAddon addonType="append">
                                                    <Button color="transparent" onClick={onReplySubmit}><Send/></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Form>
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
}
export default TimeLineContents
