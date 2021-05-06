import { Descriptions } from 'antd';
import React, { memo, useState } from 'react'
import { Image } from 'react-bootstrap';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import url from '../../../route/DevUrl'
import htmlParser from 'html-react-parser';
import { calcUnit } from '../../../utils/fileSizeUnit';
import { FileDownload } from '../../../utils/commonMethod';

const CloudDetailModal=memo((props)=> {
    const {isOpen, file,ModalHandler} = props
    const {mimetype} = file;
    const typeMainCategory = mimetype.split("/");
    // 사진 크게 보기
    const [BiggerImageView, setBiggerImageView] = useState(false);
    
    //닫기
    const onCloseModal = () => {
        ModalHandler(false)
    };
    //다운로드
    const onDownloadHandler =()=>{
        FileDownload(file);
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
    const renderItemContents =()=>{
        let component = "";
        switch (typeMainCategory[0]) {
            case "video":
                component = <video style={{maxWidth:'700px', maxHeight:'450px'}} src={`${url}/${file.originalpath}`} controls />;
                break;
            case "image":
                component = <Image src={`${url}/${file.originalpath}`} rounded style={{maxWidth:'80%',maxHeight:'80%'}} onClick={onImageView}/>;
                break;
            case "audio":
                component = <audio style={{width:'700px'}} controls src={`${url}/${file.originalpath}`}/>;
                break;
            default:
                break;
        }
        return component;
    }
    const onImageView =()=>{
        setBiggerImageView(true);
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
                    <Descriptions title = {file.originalname} bordered>
                        <Descriptions.Item label="제목" span={2}>{file.originalname}</Descriptions.Item>
                        <Descriptions.Item label="확장자">{file.mimetype}</Descriptions.Item>
                        <Descriptions.Item label="용량" span={3}>{calcUnit(file.size)}</Descriptions.Item>
                        <Descriptions.Item label="태그" span={3}>{file.tags}</Descriptions.Item>
                        <Descriptions.Item label="설명" span={3}>{htmlParser(file.description)}</Descriptions.Item>
                        <Descriptions.Item label="다운로드" span={3}>
                            <Button onClick={onDownloadHandler} download>클릭!</Button>
                            {/* <a herf={`${url}/${file.path}`} download>클릭!</a> */}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={onConfirmModal}>저장</Button>{' '}
          <Button color="secondary" onClick={onCloseModal}>취소</Button> */}
        </ModalFooter>
        {
            typeMainCategory[0] ==='image' &&
            <Modal isOpen={BiggerImageView} style={{maxWidth:'85vw',maxHeight:'100vh'}} toggle={()=>setBiggerImageView(false)}>
                <ModalBody>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Image src={`${url}/${file.originalpath}`} rounded style={{maxWidth:'80vw',maxHeight:'90vh'}} onClick={onImageView}/>
                    </div>
                    
                </ModalBody>
            </Modal>
        }
        
      </Modal>
    )
})

export default CloudDetailModal
