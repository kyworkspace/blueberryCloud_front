import axios from 'axios';
import React, { memo, useContext, useState } from 'react'
import {Modal,ModalHeader,ModalBody, ModalFooter, Button} from 'reactstrap'
import PictureUpload from './PictureUpload';
import { useSelector } from 'react-redux';
import { CLOUD_API } from '../../../../../../route/Apis';
import { CloudBoardContext } from '../../../CloudViewer';
import { toast } from 'react-toastify';
import { dateToString } from '../../../../../../utils/commonMethod';
import { Space, Select } from 'antd';
const {Option} = Select;

const PictureUploadModal=memo((props)=> {

    const user = useSelector(state => state.user)
    const folderPath = useSelector(state => state.folder.path)
    const {refreshFileList} = useContext(CloudBoardContext)
    const {buttonLabel,className} = props;
    const [allOpenrating, setAllOpenrating] = useState(null)
    
    const [Image, setImage] = useState([]);
    const [Loading, setLoading] = useState(false);
    
    const onCloseModal = () => {
        props.ModalHandler(false)
    };
    const onConfirmModal = () => {
        if(Image.length === 0){
          alert("이미지를 등록해주세요")
          return;
        }
        Image.map(item=>{
          if(allOpenrating){
            item.openrating = allOpenrating;
          }
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
    const onAllOpenratingHandler = (value)=>{
      setAllOpenrating(value);
    }

    return (
      <Modal isOpen={props.isOpen} className={className} style={{width:'600px',maxWidth:'90%', fontFamily:'nanumL'}}>
        <ModalHeader toggle={onCloseModal}>사진 업로드</ModalHeader>
        <ModalBody>
          <Space direction="vertical">
            <Space size={10} style={{width:'100%'}}>
              공개 여부 일괄적용
              <Select value={allOpenrating} onChange={onAllOpenratingHandler} style={{width:'150px'}}>
                  <Option value={null}>설정안함</Option>
                  <Option value={2}>비공개</Option>
                  <Option value={1}>친구에게만</Option>
                  <Option value={0}>전체 공개</Option>
              </Select>
            </Space>
          <PictureUpload refreshFunction={updateImages} loading={Loading} setLoading={setLoading} allOpenrating={allOpenrating}/>
          </Space>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmModal} disabled={Loading}>저장</Button>{' '}
          <Button color="secondary" onClick={onCloseModal}>취소</Button>
        </ModalFooter>
      </Modal>
    )
})

export default PictureUploadModal
