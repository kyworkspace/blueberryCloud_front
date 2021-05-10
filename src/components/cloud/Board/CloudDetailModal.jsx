import { Descriptions, Select, Space } from 'antd';
import React, { memo, useContext, useState } from 'react'
import { Image } from 'react-bootstrap';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import url from '../../../route/DevUrl'
import htmlParser from 'html-react-parser';
import { calcUnit } from '../../../utils/fileSizeUnit';
import { FileDownload, FileUpdate } from '../../../utils/commonMethod';
import { CloudBoardContext } from './CloudViewer';
import CKEditors from "react-ckeditor-component";
import { errorMessage, successMessage } from '../../../utils/alertMethod';

const {Option} = Select;
const openratingConvert =(number)=>{
    switch (number) {
        case 0:
            return "전체공개"
        case 1:
            return "친구에게만 공개"
        case 2:
            return "비공개"
    }
}

const CloudDetailModal=memo((props)=> {
    const {SelectedFile,refreshFileList} = useContext(CloudBoardContext)
    const {isOpen, ModalHandler} = props
    const {mimetype,originalpath,originalname,size,description,openrating} = SelectedFile;
    const typeMainCategory = mimetype.split("/");
    // 사진 크게 보기
    const [biggerImageView, setBiggerImageView] = useState(false);
    // 파일 수정
    const [updateFlag, setUpdateFlag] = useState(false);

    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedOpenrating, setUpdatedOpenrating] = useState(openrating);

    
    //닫기
    const onCloseModal = () => {
        ModalHandler(false)
    };
    //다운로드
    const onDownloadHandler =()=>{
        FileDownload(SelectedFile);
        // 왜 블롭이 안되지?
        // axios.get(`${url}/${file.originalpath}`,config)
        // .then(response=>{
        //     FileDownload(response.data,file.originalname)
        // // const blob = new Blob([response.data], {type: file.mimetype})
        // // const downloadUrl = window.URL.createObjectURL(blob)
        // // const a = document.createElement("a")
        // // a.href = downloadUrl
        // // a.download = `${file.originalname}`

        // // a.click()
        // // a.remove()
        // // window.URL.revokeObjectURL(downloadUrl);

        // })
        
    }
    // 프로필 사진으로 설정
    const onChangeProfileImage = ()=>{

    }
    //프로필 배경으로 설정
    const onChangeBackgroundImage =()=>{

    }
    
    const renderItemContents =()=>{
        let component = "";
        switch (typeMainCategory[0]) {
            case "video":
                component = <video style={{maxWidth:'700px', maxHeight:'450px'}} src={`${url}/${originalpath}`} controls />;
                break;
            case "image":
                component = <Image src={`${url}/${originalpath}`} rounded style={{maxWidth:'80%',maxHeight:'80%'}} onClick={onImageView}/>;
                break;
            case "audio":
                component = <audio style={{width:'700px'}} controls src={`${url}/${originalpath}`}/>;
                break;
            default:
                break;
        }
        return component;
    }
    const onImageView =()=>{
        setBiggerImageView(true);
    }
    //수정 모드로 변환
    const onUpdateHandler =()=>{
        setUpdateFlag(true);
    }
    //수정 저장 취소
    const onCancelHandler =()=>{
        setUpdateFlag(false);
    }
    // 수정저장
    const onSaveHandler =()=>{
        let newfile = {...SelectedFile};
        newfile.description = updatedDescription;
        newfile.openrating = updatedOpenrating;

        let body = newfile;
        FileUpdate(body).then(response=>{
            if(response.data.success){
                successMessage('수정이 완료되었습니다.');
                refreshFileList();
                onCloseModal();
            }
        })
        .catch(err=>{
            errorMessage('수정실패.\n 오류가 반복될시 관리자에게 문의해주세요')
        })
    }
    //
    const onOpenRatingHandler =(value)=>{
        setUpdatedOpenrating(value);
    }
    const onDescHandler =(evt)=>{
        const newContent = evt.editor.getData();
        setUpdatedDescription(newContent);
    }
    return (
        <Modal isOpen={isOpen} style={{maxWidth:'1600px',maxHeight:'1000px'}} toggle={onCloseModal}>
        <ModalHeader toggle={onCloseModal}>파일 상세보기</ModalHeader>
        <ModalBody>
            <Row>
                <Col xs="12" sm="6"  md="6" >
                    <div style={{display:'flex', justifyContent:'center',alignItems: 'center', height:'100%',padding:'20px'}}>
                        { renderItemContents() }
                    </div>
                </Col>
                <Col xs="12" sm="6"  md="6" >
                    <Descriptions title = {originalname} bordered>
                        <Descriptions.Item label="제목" span={2}>{originalname}</Descriptions.Item>
                        <Descriptions.Item label="확장자">{mimetype}</Descriptions.Item>
                        <Descriptions.Item label="용량" span={3}>{calcUnit(size)}</Descriptions.Item>
                        <Descriptions.Item label="공유 URL" span={3}>{`${url}/${originalpath}`}</Descriptions.Item>
                        {
                            updateFlag ? 
                            <>
                                <Descriptions.Item label="공개" span={3}>
                                    <Select value={updatedOpenrating} onChange={onOpenRatingHandler} style={{width:'200px'}}>
                                        <Option value={2}>비공개</Option>
                                        <Option value={1}>친구에게만</Option>
                                        <Option value={0}>전체 공개</Option>
                                    </Select>
                                </Descriptions.Item>
                                <Descriptions.Item label="설명" span={3}>
                                <CKEditors
                                        activeclassName="p10"
                                        content={updatedDescription}
                                        events={{
                                            "change": onDescHandler
                                        }}
                                    />
                                </Descriptions.Item>
                            </>
                            :
                            <>
                                <Descriptions.Item label="공개" span={3}>{openratingConvert(openrating)}</Descriptions.Item>
                                <Descriptions.Item label="설명" span={3}>{htmlParser(description)}</Descriptions.Item>
                                <Descriptions.Item label="다운로드" span={3}>
                                    <Button onClick={onDownloadHandler} >클릭!</Button>
                                </Descriptions.Item>
                            </>
                        }
                        
                        {typeMainCategory[0] === 'image' && 
                            <Descriptions.Item label="사진설정" span={3}>
                                <Space size={15}>
                                    <Button onClick={onChangeProfileImage} color="primary">프로필 사진으로 설정</Button>
                                    <Button onClick={onChangeBackgroundImage} color="secondary">배경 사진으로 설정</Button>
                                </Space>
                            </Descriptions.Item>
                        }
                    </Descriptions>
                </Col>
            </Row>
        </ModalBody>
        <ModalFooter>
            {
                updateFlag ? 
                <>
                <Button color="primary" onClick={onSaveHandler}>저장</Button>
                <Button color="secondary" onClick={onCancelHandler}>취소</Button>
                </>
                :
                <Button color="primary" onClick={onUpdateHandler}>수정</Button>

            }
          
        </ModalFooter>
        {
            typeMainCategory[0] ==='image' &&
            <Modal isOpen={biggerImageView} style={{maxWidth:'85vw',maxHeight:'100vh'}} toggle={()=>setBiggerImageView(false)}>
                <ModalBody>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Image src={`${url}/${originalpath}`} rounded style={{maxWidth:'80vw',maxHeight:'90vh'}} onClick={onImageView}/>
                    </div>
                </ModalBody>
            </Modal>
        }
        
      </Modal>
    )
})

export default CloudDetailModal
