import { message } from 'antd';
import axios from 'axios';
import React, { memo, useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import {Modal,ModalHeader,ModalBody, ModalFooter, Button, Label, Input} from 'reactstrap'
import { CLOUD_API } from '../../../../../../route/Apis';
import { CloudBoardContext } from '../../CloudViewer';

const FolderCreateModal=memo((props) =>{
    //리스트 리프레쉬 컨텍스트
    const {refreshFileList} = useContext(CloudBoardContext)
    const user = useSelector(state => state.user)
    const folderPath = useSelector(state => state.folder.path);
    const {isOpen,ModalHandler} = props;
    const [folderName, setFolderName] = useState("");
    const onCloseModal = () => {
        ModalHandler(false)
    };
    const onConfirmModal =()=>{
        console.log(folderPath);
        if(folderName===""){
            alert("폴더명을 입력 해주세요");
            return false;
        }
        
        let body = {
            //File과 같은 스키마 사용
            filename : folderName,
            cloudpath : folderPath,
            writer : user.userData._id,
            mimetype : "Folder",
            importance : 1,
        };

        axios.post(`${CLOUD_API}/folder/create`,body)
        .then(response=>{
            if(response.data.success){
                message.success("폴더가 생성되었습니다.");
                ModalHandler(false)
                refreshFileList();
            }else{
                alert("폴더생성에 실패하였습니다. \n 다시 시도해주세요");
            }
        })
    }
    const onFolderNameHandler=(e)=>{
        setFolderName(e.currentTarget.value);
    }
    return (
        <>
        <Modal isOpen={isOpen} style={{minWidth:'600px'}}>
        <ModalHeader toggle={onCloseModal}>새폴더 생성</ModalHeader>
        <ModalBody>
                    <Label >폴더명</Label>
                    <Input className="form-control"  placeholder="폴더 명을 입력해주세요" value={folderName} onChange={onFolderNameHandler} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmModal}>저장</Button>{' '}
          <Button color="secondary" onClick={onCloseModal}>취소</Button>
        </ModalFooter>
      </Modal>
      </>
    )
})

export default FolderCreateModal
