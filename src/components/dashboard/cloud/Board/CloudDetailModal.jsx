import { Descriptions } from 'antd';
import axios from 'axios';
import React, { memo } from 'react'
import { Image } from 'react-bootstrap';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import url from '../../../../route/DevUrl'
import htmlParser from 'html-react-parser';
import { calcUnit } from '../../../../utils/fileSizeUnit';

const CloudDetailModal=memo((props)=> {
    const {isOpen, file,ModalHandler} = props
    const onCloseModal = () => {
        ModalHandler(false)
    };
    const onDownloadHandler =()=>{
        //window.location.href=`${url}/${file.path}`
        axios.get(`${url}/${file.path}`)
        .then(response=>{
            console.log(response)

        const blob = new Blob([response.data], {type: file.mimetype})

        const downloadUrl = window.URL.createObjectURL(blob)

        const a = document.createElement("a")

        a.href = downloadUrl
        a.download = `${file.filename}`

        a.click()
        a.remove()
        window.URL.revokeObjectURL(downloadUrl);

        })
        
    }
    return (
        <Modal isOpen={isOpen} style={{maxWidth:'1600px',maxHeight:'1000px'}}>
        <ModalHeader toggle={onCloseModal}>파일 상세보기</ModalHeader>
        <ModalBody>
            <Row>
                <Col xs="12" sm="6"  md="6" >
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Image src={`${url}/${file.originalpath}`} rounded style={{maxWidth:'50%',maxHeight:'50%'}}/>
                    </div>
                </Col>
                <Col xs="12" sm="6"  md="6" >
                    <Descriptions title = {file.filename} bordered>
                        <Descriptions.Item label="제목" span={2}>{file.filename}</Descriptions.Item>
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
      </Modal>
    )
})

export default CloudDetailModal
