import React, { memo, useCallback, useEffect, useState } from 'react'
import {Card, Col, Row, CardBody } from 'reactstrap'
import {LikeOutlined, MessageOutlined, ToolOutlined, UserOutlined} from '@ant-design/icons'
import { getFriendsList, getMainCommentList, getMainLikeList } from '../../../../../utils/commonMethod';
import { errorMessage } from '../../../../../utils/alertMethod';
import { Empty, Space, Tooltip } from 'antd';
import url from '../../../../../route/DevUrl';


const CloudUseGraph=memo((props) =>{
  const {user} = props;
  const [likeList, setLikeList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);

  // const [commentsWidth, setCommentsWidth] = useState('100%');

  useEffect(() => {
    if(user.isAuth){
      getMainCommentsHandler();
      // getMainFriendsListHandler();
      getMainLikeHandler();
      getMainNoticeHandler();
    }
  }, [user])

    //좋아요 가져오기
    const getMainLikeHandler=()=>{
      getMainLikeList()
      .then(list=>{
        setLikeList(list)
      })
      .catch(err=>{
        errorMessage('좋아요 정보를 불러오는데 실패하였습니다.');
      })


    }
    // 댓글 가져오기
    const getMainCommentsHandler=()=>{
      getMainCommentList()
      .then(list=>{
        setCommentsList(list);
      })
      .catch(err=>{
        errorMessage("댓글을 불러오던 중 오류가 발생하였습니다.")
      })
      
    }

    //친구 목록 가져오기
    const getMainFriendsListHandler = ()=>{
      getFriendsList(3).then(list=>{
        setFriendsList(list)
      })
      .catch(err=>{
        errorMessage('친구목록을 불러오는데 실패하였습니다.')
      })
    }
    //공지사항 목록 가져오기
    const getMainNoticeHandler =()=>{

    }
    //댓글쪽 부모 노트 크기 구하기 ref에 넣으면 됨
    // const comDiv = useCallback(
    //   (node) => {
    //     console.log(node.getBoundingClientRect().width)
    //     setCommentsWidth(node.getBoundingClientRect().width)
    //   },
    //   [],
    // )
  
    return (
        <Col xl="8 xl-100" className="dashboard-sec box-col-12">
            <Card className="earning-card">
              <CardBody className="p-0">
                <Row className="m-0">
                  <Col xl="4" className="earning-content p-0">
                    <div style={{display:'flex', justifyContent:'center', marginTop:'10px'}}>
                      <h3 className="font-primary" ><ToolOutlined /> 공지사항</h3>
                    </div>
                  </Col>
                  <Col xl="4" className="earning-content p-0">
                    <div style={{display:'flex', justifyContent:'center', marginTop:'10px'}}>
                      <h3 className="font-primary"><LikeOutlined /> 좋아요</h3>
                    </div>
                    <div style={{height:'430px'}}>
                      { likeList.length > 0 ?
                      <Space size={10} direction="vertical" className="p-10">
                        {likeList.map((item,index)=>{
                            return (
                              <Space key={item.id}>
                                <div style={{width:'50px', height:'50px'}}>
                                  {item.file.mimetype.indexOf('video')>-1?
                                  <img src={`${url}/${item.file.thumbnailpath}`} style={{width:'100%', height:'100%', borderRadius:'100%'}}/>
                                  :
                                  <img src={`${url}/${item.file.logicPath}`} style={{width:'100%', height:'100%',borderRadius:'100%'}} />
                                  }
                                </div>
                                {item.user.name}님이 좋아요를 눌러주셨습니다.
                              </Space>
                            )
                        })}
                      </Space>
                      :
                      <div style={{height:'100%'}}>
                        <Empty description="기록이 없습니다"/>
                      </div>
                      }
                    </div>
                  </Col>
                  <Col xl="4" className="earning-content p-0">
                    <div style={{display:'flex', justifyContent:'center', marginTop:'10px'}}>
                      <h3 className="font-primary"><MessageOutlined /> 최근 댓글</h3>
                    </div>
                    <div style={{height:'430px',width:'100%'}}>
                      { commentsList.length > 0 ?
                      <Space size={10} direction="vertical" className="p-10">
                        {commentsList.map((item,index)=>{
                            return (
                              <Space key={item.id}>
                                <div style={{width:'50px', height:'50px'}}>
                                  {item.file.mimetype.indexOf('video')>-1?
                                  <img src={`${url}/${item.file.thumbnailpath}`} style={{width:'100%', height:'100%', borderRadius:'100%'}}/>
                                  :
                                  <img src={`${url}/${item.file.logicPath}`} style={{width:'100%', height:'100%',borderRadius:'100%'}} />
                                  }
                                </div>
                                <Tooltip title={item.content}>
                                  {item.user.name}님이 댓글을 작성해주셨습니다.
                                </Tooltip>
                              </Space>
                            )
                        })}
                      </Space>
                      :
                      <div style={{height:'100%'}}>
                        <Empty description="기록이 없습니다"/>
                      </div>
                      }
                    </div>
                  </Col>
                  {/* <Col xl="3" className="earning-content p-0">
                    <div style={{display:'flex', justifyContent:'center', marginTop:'10px'}}>
                      <h3><UserOutlined /> 친구</h3>
                    </div>
                    <div>

                    </div>
                  </Col> */}
                </Row>
              </CardBody>
            </Card>
          </Col>
    )
})

export default CloudUseGraph
