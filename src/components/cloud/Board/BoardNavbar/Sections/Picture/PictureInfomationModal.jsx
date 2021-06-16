import React, { memo, useState } from 'react'
import { Image, Table } from 'react-bootstrap';
import {Modal,ModalHeader,ModalBody, ModalFooter, Button} from 'reactstrap'
import SunEditor from 'suneditor-react';
import url from '../../../../../../route/DevUrl'
import { Divider, Select } from 'antd';
const {Option} = Select;
const PictureInfomationModal=memo((props)=> {

    const {buttonLabel,className,picture,ModalHandler,isOpen,pictureHandler,allOpenrating} = props;
    const [description, setDescription] = useState(picture.description ? picture.description:"");
    const [openrating, setOpenrating] = useState(picture.openrating ? picture.openrating : 2);
    const onCloseModal = () => {
        ModalHandler(false)
    };
    const onConfirmModal = () => {
        pictureHandler(picture,description,openrating)
        ModalHandler(false)
    };
    const onDescHandler =(evt)=>{
        const newContent = evt.editor.getData();
        setDescription(newContent);
    }
    const onRatingHandler=(value)=>{
        setOpenrating(value);
    }
    return (
    <Modal isOpen={isOpen} className={className} style={{width:'600px', maxWidth:'90%', maxHeight:'90%'}}>
        <ModalHeader toggle={onCloseModal}>사진 상세 정보</ModalHeader>
        <ModalBody>
            <Table responsive="md">
                <tr>
                    <th colSpan="4" style={{textAlign:'center'}}><Image src={`${url}/${picture.logicPath}`} rounded style={{width:'300px', maxWidth:'90%'}}/></th>
                </tr>
                {/* <tr>
                    <td>공개 여부</td>
                    <td colSpan="3">
                        {
                            allOpenrating ?
                                <p>일괄적용이 되어있습니다.</p>
                            :
                            <Select value={openrating} onChange={onRatingHandler} style={{width:'200px'}}>
                                <Option value={2}>비공개</Option>
                                <Option value={1}>친구에게만</Option>
                                <Option value={0}>전체 공개</Option>
                            </Select>
                        }
                        
                    </td>
                </tr> */}
            </Table>
            <Divider orientation="left" plain>공개여부</Divider>
            {
                allOpenrating ?
                    <p>일괄적용이 되어있습니다.</p>
                :
                <Select value={openrating} onChange={onRatingHandler} style={{width:'200px'}}>
                    <Option value={2}>비공개</Option>
                    <Option value={1}>친구에게만</Option>
                    <Option value={0}>전체 공개</Option>
                </Select>
            }
            <Divider orientation="left" plain>
                설명입력
            </Divider>
            <SunEditor 
                    lang="ko"
                    width="100%"
                    height="20vh"
                    placeholder="사진 설명을 입력해주세요"
                    setOptions={{
                        buttonList : [
                            ['fontSize', 'formatBlock'],
                            ['bold', 'underline', 'italic', 'strike'],
                            ['fontColor', 'hiliteColor','align', 'horizontalRule']
                        ]
                    }}
                    onChange={(value)=>setDescription(value)}
                    setContents={description}
                />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onConfirmModal}>확인</Button>{' '}
          <Button color="secondary" onClick={onCloseModal}>취소</Button>
        </ModalFooter>
    </Modal>
    )
})

export default PictureInfomationModal
