import { DatePicker, Space } from 'antd';
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
    const [email, setEmail] = useState(item.email);
    const [birthDay, setBirthDay] = useState(item.birthDay);
    const [phoneNumber, setPhoneNumber] = useState(item.phoneNumber);
    const [greeting, setGreeting] = useState(item.greeting)

    const onCloseModal=()=>{
        ModalHandler(false);
    }
    const profileSave =()=>{

        let body={
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
        <Modal isOpen={isOpen} toggle={onCloseModal} style={{width:'500px', height:'600px'}}>
            <ModalHeader toggle={onCloseModal}>
                프로필 수정
            </ModalHeader>
            <ModalBody>
                <Space size={10} direction="vertical">
                    <Space size={20}>
                        <div>
                            인사말
                        </div>
                        <div>
                            <Input style={{width:'400px'}} value={greeting} onChange={(e)=>setGreeting(e.currentTarget.value)} maxLength={50}/>
                        </div>
                    </Space>
                    <Space size={20}>
                        <div>
                            E-mail
                        </div>
                        <div>
                            <Input type="email" style={{width:'400px'}} value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/>
                        </div>
                    </Space>
                    <Space size={20}>
                        <div>
                            생일
                        </div>
                        <div>
                            <DatePicker onChange={(date,dateString)=>{setBirthDay(dateString)}} value={moment(new Date(birthDay))} style={{width:'400px'}}/>
                        </div>
                    </Space>
                    <Space size={20}>
                        <div>
                            연락처
                        </div>
                        <div>
                            <Input style={{width:'400px'}} value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.currentTarget.value)}}/>
                        </div>
                    </Space>
                </Space>
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
