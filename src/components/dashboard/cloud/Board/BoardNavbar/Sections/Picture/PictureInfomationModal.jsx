import TextArea from 'antd/lib/input/TextArea';
import React, { memo, useState } from 'react'
import { Image, Table } from 'react-bootstrap';
import CKEditors from "react-ckeditor-component";
import {Modal,ModalHeader,ModalBody, ModalFooter, Button} from 'reactstrap'
import { calcUnit } from '../../../../../../../utils/fileSizeUnit';

const PictureInfomationModal=memo((props)=> {

    const {buttonLabel,className,picture,ModalHandler,isOpen,pictureHandler} = props
    const [description, setDescription] = useState(picture.desc ? picture.desc:"");
    const onCloseModal = () => {
        ModalHandler(false)
    };
    const onConfirmModal = () => {
        pictureHandler(picture,description)
        ModalHandler(false)
    };
    const onDescHandler =(evt)=>{
        const newContent = evt.editor.getData();
        setDescription(newContent);
    }
    return (
    <Modal isOpen={isOpen} className={className} style={{minWidth:'600px'}}>
        <ModalHeader toggle={onCloseModal}>사진 상세 정보</ModalHeader>
        <ModalBody>
            <Table responsive="md">
                <tr>
                    <th colSpan="4" style={{textAlign:'center'}}> <Image src={`http://localhost:5000/${picture.path}`} rounded style={{width:'300px'}}/></th>
                </tr>
                <tr>
                    <td>파일제목</td>
                    <td>{picture.originalname}</td>
                    <td>확장자</td>
                    <td>{picture.mimetype}</td>
                </tr>
                <tr>
                    <td>용량</td>
                    <td colSpan="3">{calcUnit(picture.size)}</td>
                </tr>
                <tr>
                    <td>태그 추가</td>
                    <td colSpan="3">{picture.mimetype}</td>
                </tr>
                <tr>
                    <td>설명</td>
                    <td colSpan="3">
                        <CKEditors
                            activeclassName="p10"
                            content={description}
                            events={{
                                "change": onDescHandler
                            }}
                        />
                        {/* <TextArea rows={4} style={{width:'100%'}} value={description} onChange={onDescHandler}/> */}
                    </td>
                </tr>
                
            </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmModal}>확인</Button>{' '}
          <Button color="secondary" onClick={onCloseModal}>취소</Button>
        </ModalFooter>
    </Modal>
    )
})

export default PictureInfomationModal
