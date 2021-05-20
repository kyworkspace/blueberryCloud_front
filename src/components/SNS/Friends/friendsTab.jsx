import React, { Fragment,useState,useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardFooter, Media, Input, CardBody } from 'reactstrap';
import { Button, Space, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search';
import { getFriendReceiveList, getUserList, setFriendAdd } from '../../../utils/commonMethod';
import { errorMessage, successMessage } from '../../../utils/alertMethod';
import url from '../../../route/DevUrl';
import {SmileOutlined, UserAddOutlined} from '@ant-design/icons'


const FriendsTab = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [userList, setUserList] = useState([])
    const [limit, setLimit] = useState(8);
    const [skip, setSkip] = useState(0);
    useEffect(() => {
        getFriendList()
      },[])

    const getFriendList = ()=>{
        let body={
            searchTerm,
            limit,
            skip,
        }
        getUserList(body)
        .then(response=>{
            if(response.data.success){
                console.log(response.data.list)
                setUserList(response.data.list)
                setSkip(skip+limit);
            }
        })
        .catch(err=>{
            errorMessage("회원 정보를 불러오는데 오류가 발생하였습니다.")
        })
    }
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
    const onFriendReceiveList =()=>{
        getFriendReceiveList()
        .then(response=>{
            if(response.data.success){
                setUserList(response.data.list);
            }
        })
        .catch(err=>{
            errorMessage("친구요청을 불러오던중 오류가 발생하였습니다.")
        })

    }


    return (
        <Fragment>
            <Card>
            <CardHeader>
            <Space>
                <div>
                    친구 찾기
                </div>
                <Search
                    placeholder="이름, 이메일, 전화번호 ..."
                    allowClear
                    enterButton="검색"
                    size="large"
                    onSearch={getFriendList}
                    value={searchTerm}
                    onChange={(e)=>{setSearchTerm(e.currentTarget.value)}}
                    style={{width:'30vw'}}
                    />
                    <Button size="large">친구 신청 목록</Button>
                    <Button size="large" onClick={onFriendReceiveList}>친구 요청</Button>
                    <Button size="large" >팔로잉 목록</Button>
            </Space>
            </CardHeader>
            <CardBody>
                <Row>
                    {userList.map((user, i) => 
                    <Col md="6" xl="4 box-col-6 xl-50" key={i}>
                        <Card className="custom-card">
                            <CardHeader>
                                <Media body className="img-fluid" src={ user.backgroundImage && `${url}/${user.backgroundImage}`} alt="" />
                            </CardHeader>
                            <div className="card-profile">
                                <Media body className="rounded-circle" src={user.profileImage && `${url}/${user.profileImage}`} alt="" />
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
                                            <Tooltip title={<span>친구 신청</span>}>
                                                <UserAddOutlined onClick={()=>onFriendAdd(user._id)}/>
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
                    )}
                </Row>
            </CardBody>
            </Card>
            
            
        </Fragment>
    );
};

export default FriendsTab;