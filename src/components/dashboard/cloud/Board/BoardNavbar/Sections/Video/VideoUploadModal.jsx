import React, { memo, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import {Modal,ModalHeader,ModalBody, ModalFooter, Button} from 'reactstrap'
import { CloudBoardContext } from '../../../CloudViewer'

const VideoUploadModal=memo((props) =>{

    const {buttonLabel,className,isOpen,ModalHandler} = props;

    const user = useSelector(state => state.user)
    const folderPath = useSelector(state => state.folder.path)
    const {refreshFileList} = useContext(CloudBoardContext)
    
    const onCloseModal = () => {
        ModalHandler(false)
    };

    const onConfirmModal = () => {

    }

    return (
        <>
        <Modal isOpen={isOpen} className={className} style={{minWidth:'600px'}}>
            <ModalHeader toggle={onCloseModal}>동영상 업로드</ModalHeader>
            <ModalBody>
            
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={onConfirmModal}>저장</Button>{' '}
            <Button color="secondary" onClick={onCloseModal}>취소</Button>
            </ModalFooter>
        </Modal>
        </>
    )
})

export default VideoUploadModal
