import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal,ModalHeader,ModalBody, ModalFooter, Button } from 'reactstrap';
import {Divider} from 'antd';
import { setNoticeDetailModal } from '../../redux/notice/_actions/notice_actions';
import htmlParser from 'html-react-parser';

const NoticeDetailModal=memo((props) =>{
    const dispatch = useDispatch();

    const notice = useSelector(state => state.notice);
    const onCloseModal=()=>{
        const body={
            show : false
        }
        dispatch(setNoticeDetailModal(body))
    }

    if(notice.show){
        return (
            <Modal isOpen={notice.show} toggle={onCloseModal}  style={{width:'600px', maxWidth:'90%', height:'600px',maxHeight:'70%', fontFamily:'nanumL'}} >
                <ModalHeader toggle={onCloseModal}>{notice.title}</ModalHeader>
                <ModalBody>
                    <Divider orientation="left" plain>한줄 설명</Divider>
                    <div style={{border:'1px solid', borderColor:'#fafafa'}}>
                        {notice.subTitle}
                    </div>
                    <Divider orientation="left" plain>내용</Divider>
                    <div style={{maxHeight:'400px', overflow:'auto', border:'1px solid', borderColor:'#fafafa'}}>
                        {htmlParser(notice.contents)}
                    </div>
                </ModalBody>
            </Modal>
        )
    }else{
        return <></>
    }
    
})

export default NoticeDetailModal
