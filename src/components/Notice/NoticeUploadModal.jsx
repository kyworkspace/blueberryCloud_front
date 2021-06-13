import React, { memo, useEffect, useState } from 'react'
import { Button, Input, Modal,ModalBody,ModalFooter,ModalHeader } from 'reactstrap'
import SunEditor from 'suneditor-react';
import {Divider} from 'antd';


const NoticeUploadModal=memo((props) =>{
    const {isOpen, setModal, noticeUpload,noticeUpdate,selectedNotice,setSelectedNotice} = props;
    const [id, setId] = useState("");
    const [contents, setContents] = useState();
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");

    useEffect(() => {
        if(selectedNotice){
            setId(selectedNotice._id);
            setTitle(selectedNotice.title);
            setSubTitle(selectedNotice.subTitle);
            setContents(selectedNotice.contents);
        }else{
            setId("");
            setTitle("");
            setSubTitle("");
            setContents("");
        }
    }, [selectedNotice])

    const onCloseModal =()=>{
        setModal(false);
        setSelectedNotice(null);
        setTitle("");
        setSubTitle("");
        setContents("");
    }
    const onConfirmModal=()=>{
        const body ={
            id,
            title,
            subTitle,
            contents,
        };
        if(selectedNotice){
            noticeUpdate(body);
        }else{
            noticeUpload(body);
        }
        onCloseModal();
    }
    return (
        <Modal isOpen = {isOpen} toggle={onCloseModal} style={{width:'600px',maxWidth:'90%', fontFamily:'twayair'}}>
            <ModalHeader toggle={onCloseModal}>공지사항 등록</ModalHeader>
            <ModalBody>
                <Divider orientation="left" plain>
                    공지사항 제목
                </Divider>
                <Input value={title} onChange={(e)=>setTitle(e.currentTarget.value)} width={"100%"}/>
                <Divider orientation="left" plain>
                    공지사항 한줄 설명
                </Divider>
                <Input value={subTitle} onChange={(e)=>setSubTitle(e.currentTarget.value)} width={"100%"}/>
                <Divider orientation="left" plain>
                    공지사항 내용
                </Divider>
                <SunEditor 
                    lang="ko"
                    width="100%"
                    height="30vh"
                    placeholder="공지사항을 입력해주세요"
                    setOptions={{
                        buttonList : [
                            ['fontSize', 'formatBlock'],
                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table','image']
                        ]
                    }}
                    onChange={(value)=>setContents(value)}
                    setContents={contents}
                />
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={onConfirmModal}>저장</Button>{' '}
            <Button color="secondary" onClick={onCloseModal}>취소</Button>
            </ModalFooter>
        </Modal>
    )
})

export default NoticeUploadModal
