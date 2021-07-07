import React, { useState } from 'react'
import { Button, FormGroup,  Label, Modal, ModalBody, ModalFooter, ModalHeader,Form, Container } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Col, Input, Row } from 'antd';
import { infoMessage } from '../../../../utils/alertMethod';
import { setPasswordUpdate } from '../../../../redux/user/_actions/user_actions';

function UserPasswordChange(props) {
    const {isOpen, ModalHandler} = props;
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [togglePassword,setTogglePassword] = useState(false)

    const HideShowPassword  = (tPassword) => {
        setTogglePassword(!tPassword)
      }
    const onCloseModal=()=>{
        ModalHandler(false);
    }
    const onPasswordChange=()=>{
        if(newPassword !== newPasswordConfirm){
            return infoMessage('입력한 신규 비밀번호가 다릅니다.')
        }
        const body={
            password,
            newPassword
        }
        dispatch(setPasswordUpdate(body))
        .then(res=>{
            if(res.payload){
                infoMessage(res.payload.message)
                onCloseModal()
            }
        })
    }
    return (
        <Modal isOpen={isOpen} toggle={onCloseModal} style={{width:'50vh',maxWidth:'90%', fontFamily:'nanumL'}}>
            <ModalHeader toggle={onCloseModal}>
                프로필 수정
            </ModalHeader>
            <ModalBody>
            <Container fluid={true} className="p-0">
            <Form className="theme-form">
                  <FormGroup>
                <Row gutter={[10,10]}>
                    <Col xs={8}>
                        현재 비밀번호
                    </Col>
                    <Col xs={14}>
                        <Input type={togglePassword ?  "text" : "password" } value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </Col>
                    <Col xs={2}>
                        <div onClick={() => HideShowPassword(togglePassword)}>{togglePassword ? 'hide' : 'show'} </div>
                    </Col>
                    <Col xs={8}>
                        신규 비밀번호
                    </Col>
                    <Col xs={16}>
                    <Input type={togglePassword ?  "text" : "password" } value={newPassword} onChange={(e) => setNewPassword(e.currentTarget.value)} />
                    </Col>
                    <Col xs={8}>
                        신규 비밀번호 확인
                    </Col>
                    <Col xs={16}>
                    <Input type={togglePassword ?  "text" : "password" }  value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.currentTarget.value)} />
                    </Col>
                </Row>
                </FormGroup>
                </Form>
                </Container>
            </ModalBody>
            
            <ModalFooter>
                <Button color="primary" onClick={onPasswordChange}>
                    저장
                </Button>
                <Button onClick={()=>{ModalHandler(false)}}>
                    취소
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default UserPasswordChange
