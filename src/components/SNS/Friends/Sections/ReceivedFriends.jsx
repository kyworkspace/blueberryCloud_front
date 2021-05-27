import React, { memo } from 'react'
import { Row, Col, Card, CardHeader, CardFooter, Media, Input, CardBody } from 'reactstrap';
import { Button, Space, Tooltip } from 'antd';
import url from '../../../../route/DevUrl';
import { friendHadler } from '../../../../utils/commonMethod';
import { errorMessage } from '../../../../utils/alertMethod';
const ReceivedFriends=memo((props) =>{
    const {user,onFriendReceiveList} = props;

    const onFriendHandler =(level)=>{
        let body={
            userFrom : user._id,
            level
        }
        friendHadler(body)
        .then(response=>{
            onFriendReceiveList();
        })
        .catch(err=>{
            errorMessage("통신 중 오류가 발생하였습니다. 새로고침 후 다시 시도해 주세요");
        })
    }

    return (
        <Col md="6" xl="4 box-col-6 xl-50" >
            <Card className="custom-card">
                <CardHeader>
                    <Media body className="img-fluid" src={ user.backgroundImage && `${url}/${user.backgroundImage}`} alt="" />
                </CardHeader>
                <div className="card-profile">
                    <Media body className="rounded-circle" src={`${url}/${user.profileImage}`} alt="" />
                </div>
                <div style={{display:'flex',justifyContent:'center', marginTop:'10px', marginBottom:'10px'}}>
                    <Space size={10}>
                        <Button type="primary" onClick={()=>onFriendHandler(3)}>수락</Button>
                        <Button danger type="default" onClick={()=>onFriendHandler(0)}>거절</Button>
                    </Space>
                </div>
                <div className="text-center profile-details">
                    <h4>{user.name}</h4>
                    <h6>{user.post}</h6>
                </div>
            </Card>
        </Col>
    )
})

export default ReceivedFriends
