import { Col, DatePicker, Row, Space } from 'antd';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { updateUserProfile } from '../../../../redux/user/_actions/user_actions';
import { errorMessage, successMessage } from '../../../../utils/alertMethod';
import { profileUpdate } from '../../../../utils/commonMethod';
import moment from 'moment';

const UserInfoEditModal=memo((props) =>{
    const {isOpen, ModalHandler,item}  = props;
    const dispatch = useDispatch();
    const [name, setName] = useState(item.name);
    const [nickName, setNickName] = useState(item.nickName);
    const [email, setEmail] = useState(item.email);
    const [birthDay, setBirthDay] = useState(item.birthDay||new Date());
    const [phoneNumber, setPhoneNumber] = useState(item.phoneNumber);
    const [greeting, setGreeting] = useState(item.greeting)

    const onCloseModal=()=>{
        ModalHandler(false);
    }
    const profileSave =()=>{

        let body={
            name,
            nickName,
            email,
            birthDay,
            phoneNumber,
            greeting
        };
        profileUpdate(body)
        .then(response=>{
            if(response.data.success){
                dispatch(updateUserProfile(body));
                ModalHandler(false)
                successMessage("수정 완료 하였습니다!");
            }
        })
        .catch(err=>{
            errorMessage("프로필 수정 중 오류 발생")
        })
    }

    return (
        <Modal isOpen={isOpen} toggle={onCloseModal} style={{width:'50vh',maxWidth:'90%', fontFamily:'twayair'}}>
            <ModalHeader toggle={onCloseModal}>
                프로필 수정
            </ModalHeader>
            <ModalBody>
                <Row gutter={[10,10]}>
                    <Col xs={6}>
                        성명
                    </Col>
                    <Col xs={18}>
                        <Input value={name} onChange={(e)=>setName(e.currentTarget.value)} maxLength={50}/>
                    </Col>
                    <Col xs={6}>
                        닉네임
                    </Col>
                    <Col xs={18}>
                        <Input value={nickName} onChange={(e)=>setNickName(e.currentTarget.value)} maxLength={50}/>
                    </Col>
                    <Col xs={6}>
                    인사말
                    </Col>
                    <Col xs={18}>
                        <Input value={greeting} onChange={(e)=>setGreeting(e.currentTarget.value)} maxLength={50}/>
                    </Col>
                    <Col xs={6}>
                        E-mail
                    </Col>
                    <Col xs={18}>
                        <Input type="email" value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/>
                    </Col>
                    <Col xs={6}>
                        생일
                    </Col>
                    <Col xs={18}>
                        <DatePicker onChange={(date,dateString)=>{setBirthDay(dateString)}} value={moment(birthDay)} />
                    </Col>
                    <Col xs={6}>
                        연락처
                    </Col>
                    <Col xs={18}>
                        <Input value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.currentTarget.value)}}/>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={profileSave}>
                    저장
                </Button>
                <Button onClick={()=>{ModalHandler(false)}}>
                    취소
                </Button>
            </ModalFooter>
        </Modal>
    )
})

export default UserInfoEditModal
