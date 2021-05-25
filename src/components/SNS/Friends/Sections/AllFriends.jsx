import React, { memo } from 'react'
import { Row, Col, Card, CardHeader, CardFooter, Media, Input, CardBody } from 'reactstrap';
import { Button, Space, Tooltip } from 'antd';
import url from '../../../../route/DevUrl';
import { SmileOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { setFriendAdd } from '../../../../utils/commonMethod';
import { errorMessage, successMessage } from '../../../../utils/alertMethod';
const AllFriends=memo((props) =>{
    const {user} = props;

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
        let body = {
            target
        }
        // setFriendAdd(body)
        // .then(response=>{
        //     if(response.data.success){
        //         successMessage('친구 신청을 완료 했습니다.')
        //     }
        // })
        // .catch(err=>{
        //     errorMessage("친구 신청중 오류가 발생하였습니다.")
        // })
    }

    return (
        <Col md="6" xl="4 box-col-6 xl-50" >
            <Card className="custom-card">
                <CardHeader>
                    <Media body className="img-fluid" src={ user.backgroundImage ? `${url}/${user.backgroundImage}`:`https://picsum.photos/1600/470`} alt="" />
                </CardHeader>
                <div className="card-profile">
                    <Media body className="rounded-circle" src={user.profileImage ? `${url}/${user.profileImage}`:`https://picsum.photos/100/100`} alt="" />
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

export default AllFriends
