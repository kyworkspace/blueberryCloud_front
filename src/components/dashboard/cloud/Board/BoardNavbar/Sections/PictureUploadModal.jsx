import { message } from 'antd';
import axios from 'axios';
import React, { memo, useContext, useState } from 'react'
import {Modal,ModalHeader,ModalBody, ModalFooter, Button} from 'reactstrap'
import PictureUpload from './PictureUpload';
import {CLOUD_API} from '../../../../../../route/Apis'
import { useSelector } from 'react-redux';
import { CloudBoardContext } from '../../CloudViewer';
const PictureUploadModal=memo((props)=> {

    const user = useSelector(state => state.user)
    const folderPath = useSelector(state => state.folder.path)
    const {refreshFileList} = useContext(CloudBoardContext)
    const {buttonLabel,className} = props
    const [Image, setImage] = useState([]);
    const onCloseModal = () => {
        props.ModalHandler(false)
    };
    const onConfirmModal = () => {
        if(Image.length === 0){
          message.error("이미지를 등록해 주세요")
          return;
        }
        Image.map(item=>{
          item.writer = user.userData._id;
          item.originalpath = item.path;
          //저장경로
          item.cloudpath = folderPath;
        })
        let body = Image;
      axios.post(`${CLOUD_API}/pictures/save`,body)
        .then(response=>{
          if(response.data.success){
            alert(`${Image.length}건의 업로드를 성공하였습니다.`)
            props.ModalHandler(false)
            refreshFileList();
          }else{
            alert("업로드에 실패하였습니다. \n 오류가 반복될시 관리자에게 문의해주세요")
          }
        })
    };
    const updateImages = (newImages) => {
      setImage(newImages);
  }
    return (
        <Modal isOpen={props.isOpen} className={className} style={{minWidth:'600px'}}>
        <ModalHeader toggle={onCloseModal}>사진 업로드</ModalHeader>
        <ModalBody>
          <PictureUpload refreshFunction={updateImages}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmModal}>저장</Button>{' '}
          <Button color="secondary" onClick={onCloseModal}>취소</Button>
        </ModalFooter>
      </Modal>
    )
})

export default PictureUploadModal
