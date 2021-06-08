import axios from 'axios';
import React, { memo, useContext, useState } from 'react'
import {Modal,ModalHeader,ModalBody, ModalFooter, Button} from 'reactstrap'
import PictureUpload from './PictureUpload';
import { useSelector } from 'react-redux';
import { CLOUD_API } from '../../../../../../route/Apis';
import { CloudBoardContext } from '../../../CloudViewer';
import { toast } from 'react-toastify';
import { dateToString } from '../../../../../../utils/commonMethod';

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
          alert("이미지를 등록해주세요")
          return;
        }
        Image.map(item=>{
          item.writer = user.userData._id;
          // 경로 앞부분 수정
          let newPath =  folderPath.split("/");
          newPath[0] = user.userData._id;
          //로컬 저장 경로
          item.originalpath = `${newPath.join("/")}/${dateToString(new Date(),false)}`;
          //클라우드 저장 경로
          item.cloudpath = folderPath;
        })
        let body = Image;
      axios.post(`${CLOUD_API}/pictures/save`,body)
        .then(response=>{
          if(response.data.success){
            toast.success(`${Image.length}건의 업로드를 성공하였습니다.`, {position: toast.POSITION.BOTTOM_RIGHT,autoClose:2000})
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
      <Modal isOpen={props.isOpen} className={className} style={{width:'600px',maxWidth:'90%', fontFamily:'twayair'}}>
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
