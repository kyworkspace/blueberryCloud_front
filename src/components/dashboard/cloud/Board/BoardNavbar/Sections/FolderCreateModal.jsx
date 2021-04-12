import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux';
import {Modal,ModalHeader,ModalBody, ModalFooter, Button, Label, Input} from 'reactstrap'

const FolderCreateModal=memo((props) =>{
    const folderSelector = useSelector(state => state.folder);
    const {isOpen,ModalHandler} = props;
    const [folderName, setFolderName] = useState("");
    const onCloseModal = () => {
        ModalHandler(false)
    };
    const onConfirmModal =()=>{
        console.log(folderSelector.path);
        alert("폴더 생성")
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
