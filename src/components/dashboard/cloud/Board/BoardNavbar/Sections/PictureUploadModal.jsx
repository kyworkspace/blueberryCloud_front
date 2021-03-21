import React, { memo, useState } from 'react'
import {Modal,ModalHeader,ModalBody, ModalFooter, Button} from 'reactstrap'
import PictureUpload from '../../../../../utils/PictureUpload';
const PictureUploadModal=memo((props)=> {

    const {buttonLabel,className} = props

    const onCloseModal = () => {
        props.ModalHandler(false)
    };
    const onConfirmModal = () => {
        alert("확인");
        props.ModalHandler(false)
    };
    return (
        <Modal isOpen={props.isOpen} className={className} style={{minWidth:'600px'}}>
        <ModalHeader toggle={onCloseModal}>사진 업로드</ModalHeader>
        <ModalBody>
          <PictureUpload/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmModal}>Do Something</Button>{' '}
          <Button color="secondary" onClick={onCloseModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
})

export default PictureUploadModal
