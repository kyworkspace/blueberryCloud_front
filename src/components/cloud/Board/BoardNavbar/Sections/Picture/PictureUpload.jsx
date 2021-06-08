import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import Image from 'react-bootstrap/Image'
import { Button } from 'reactstrap'
import PictureInfomationModal from './PictureInfomationModal'
import { useSelector } from 'react-redux'
import { pictureInsert } from '../../../../../../utils/commonMethod'
import url from '../../../../../../route/DevUrl';
import { Col, Row } from 'antd'

const PictureUpload=(props) =>{
    const [Files, setFiles] = useState([])
    const [fileInformation, setFileInformation] = useState({});
    const [informationModalViewer, setinformationModalViewer] = useState(false);
    const {_id} = useSelector(state => state.user.userData)
    const folder = useSelector(state => state.folder)


    const onDropHandler = async (files)=>{
        const uploadFileList = await Promise.all(
            files.map(file=>{
                return pictureInsert(file).then(response=>{return response.data.fileInfo});
            })
        )
        
        setFiles([...Files,...uploadFileList])
        props.refreshFunction([...Files,...uploadFileList])
    }
    const deleteHandler =(image)=>{
        //삭제하고자하는 이미지 인덱스
        const currentIndex = Files.indexOf(image);
        //기존 이미지 복사
        let newImages = [...Files]
        //삭제
        newImages.splice(currentIndex,1);
        //덮어씌움
        setFiles(newImages)

        //부모 컴포넌트에 값 전달
        props.refreshFunction(newImages);
    }
    const pictureInfomation=(item)=>{
        setFileInformation(item)
        setinformationModalViewer(true);
    }
    const onPictureDescriptionHandler=(item,desc,openrating)=>{
        const currentIndex = Files.indexOf(item);
        let newImages = [...Files];
        newImages[currentIndex].description = desc; //설명
        newImages[currentIndex].openrating = openrating; //공개 등급
        setFiles(newImages)
        props.refreshFunction(newImages);
    }


    return (
        <Row gutter={[50,16]}>
            <Col xs={24} xl={12}>
            <Dropzone onDrop={onDropHandler}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div 
                    style={{ 
                        width:300 , height:300, border : '1px solid lightgray',
                        alignItems:'center' , justifyContent:'center',
                        textAlign:'center'
                    }}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} accept='image/*' multiple/>
                    <p>사진을 드래그하여 넣어주세요</p>
                    <br/>
                    <p>확장자는 *.jpg,*.jpeg,*.png 만 가능합니다.</p>
                </div>
                </section>
            )}
            </Dropzone>
            </Col>
            <Col xs={24} xl={12}>
            <div style={{display:'grid', maxWidth:"250px",maxHeight:'280px',overflowY:'scroll'}}>
                {Files.map((item,index)=>(
                    <>
                    <div key={index} style={{margin:'10px'}} >
                        <Image src = {`${url}/${item.hostPath}`} rounded style={{width:'200px'}}/>
                        <Button color="primary" onClick={()=>pictureInfomation(item)}>상세정보</Button>
                        <Button color="secondary" onClick={()=>deleteHandler(item)}>삭제</Button>
                    </div>
                    <br/>
                    </>
                ))}
            </div>
            </Col>
        {informationModalViewer && <PictureInfomationModal isOpen={informationModalViewer} ModalHandler={setinformationModalViewer} picture={fileInformation} pictureHandler={onPictureDescriptionHandler}/>}
        </Row>
    )
}

export default PictureUpload
