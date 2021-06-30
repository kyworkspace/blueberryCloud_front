import React, { memo } from 'react'
import { Row, Col, Card, CardHeader, CardFooter, Media, Input, CardBody } from 'reactstrap';
import { Button, Space, Tooltip } from 'antd';
import url from '../../../../route/DevUrl';
import { SmileOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { setFriendAdd,setFriendDelete } from '../../../../utils/commonMethod';
import { confirmMessage, errorMessage, successMessage } from '../../../../utils/alertMethod';
import {withRouter} from 'react-router-dom'


const AllFriends=memo((props) =>{
    const {user,refreshList} = props;

    const onFriendAdd =(target)=>{
        let body = {
            target
        }
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
    const onFriendDelete =(target)=>{
        confirmMessage("해당 친구를 목록에서 삭제합니다.","실행","취소",()=>{
            let body = {
                target
            }
            setFriendDelete(body)
            .then(success=>{
                successMessage('친구 목록에서 삭제 됩니다.')
                refreshList();
            })
            .catch(err=>{
                errorMessage("통신 중 오류가 발생하였습니다.");
            })
        })
    }
    const onMoveToUserInfo =(id)=>{
        props.history.push(`/sns/userinfo/${id}`);
    }

    return (
        <Col md="6" xl="4 box-col-6 xl-50" >
            <Card className="custom-card" >
                {/* <CardHeader>
                    <Media body className="img-fluid" src={ user.backgroundImage ? `${url}/${user.backgroundImage}`:`https://picsum.photos/1600/470`} alt="" />
                </CardHeader> */}
                <div className="card-profile"
                    onClick={()=>onMoveToUserInfo(user._id)}
                     style={{
                    backgroundImage:`url(${url}/${user.backgroundImage})` , backgroundPosition:"center", backgroundSize:'cover', backgroundRepeat:'no-repeat'
                    , height:'200px'
                    , display:'grid', alignItems:'flex-end', justifyContent:'center'
                    , cursor:'pointer'
                    }}>
                    <Media body className="rounded-circle" src={`${url}/${user.profileImage}`} alt="" />
                </div>
                <ul className="card-social">
                    <li>
                        <a >
                            <i className="fa fa-facebook">
                            </i>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i className="fa fa-google-plus">
                            </i>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i className="fa fa-twitter">
                            </i>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i >
                                <Tooltip title={<span>팔로잉</span>}>
                                    <SmileOutlined />
                                </Tooltip>
                            </i>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i >
                                <Tooltip title={
                                    user.friends ? <span>친구 삭제</span>: <span>친구 신청</span>
                                }>
                                    {
                                        user.friends ?
                                        <UserDeleteOutlined onClick={()=>onFriendDelete(user._id)}/>
                                        :
                                        <UserAddOutlined onClick={()=>onFriendAdd(user._id)}/>
                                    }
                                    
                                </Tooltip>
                            </i>
                        </a>
                    </li>
                </ul>
                <div className="text-center profile-details">
                    <h4>{user.name}</h4>
                    <h6>{user.post}</h6>
                </div>
                <CardFooter className="row">
                    <Col sm="4 col-4">
                    <h6>팔로워</h6>
                    <h3 className="counter">{user.follower}</h3>
                    </Col>
                    <Col sm="4 col-4">
                    <h6>친구수</h6>
                    <h3><span className="counter">{user.following}</span>K</h3>
                    </Col>
                    <Col sm="4 col-4">
                    <h6>공유중인 파일</h6>
                    <h3><span className="counter">{user.totalPost}</span></h3>
                    </Col>
                </CardFooter>
            </Card>
        </Col>
    )
})

export default withRouter(AllFriends)
