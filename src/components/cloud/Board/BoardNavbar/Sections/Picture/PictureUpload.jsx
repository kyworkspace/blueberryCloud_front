import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import Image from 'react-bootstrap/Image'
import { Button } from 'reactstrap'
import PictureInfomationModal from './PictureInfomationModal'
import { useSelector } from 'react-redux'
import { pictureInsert } from '../../../../../../utils/commonMethod'
import url from '../../../../../../route/DevUrl';
import { Alert, Col, Divider, Row, Space, Spin } from 'antd'
import { errorMessage } from '../../../../../../utils/alertMethod'

const PictureUpload=(props) =>{
    const [Files, setFiles] = useState([])
    const [fileInformation, setFileInformation] = useState({});
    const [informationModalViewer, setinformationModalViewer] = useState(false);
    const {loading, setLoading,refreshFunction} = props;

    const onDropHandler = async (files)=>{
        setLoading(true);
        const uploadFileList = await Promise.all(
            files.map(file=>{
                return pictureInsert(file).then(response=>{return response.data.fileInfo});
            })
        )
        setFiles([...Files,...uploadFileList]);
        refreshFunction([...Files,...uploadFileList]);
        setLoading(false);
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
        refreshFunction(newImages);
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
                {
                    loading ?
                <div 
                    style={{ 
                        width:300 , height:300, border : '1px solid lightgray',
                        alignItems:'center' , justifyContent:'center',
                        textAlign:'center'
                    }}
                    >
                         <Spin tip="사진을 업로드 하고 있습니다." style={{width:300, height:300}}>
                            <Alert style={{width:300, height:300}}
                            message="사진을 업로드 하고 있습니다."
                            description="수량이 많거나, 통신상태가 느린 경우 시간이 소요 될수 있습니다."
                            type="info"
                            />
                        </Spin>
                </div>
                    :
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
                }
            
            </Col>
            <Col xs={24} xl={12}>
            <div style={{display:'grid', maxWidth:"100%",maxHeight:'280px',overflowY:'scroll'}}>
                <Space direction="vertical" size={10}>
                    {Files.map((item,index)=>(
                        <div key={index}>
                            <div  style={{margin:'10px', display:'flex', justifyContent:'center'}} >
                                <Image src = {`${url}/${item.logicPath}`} rounded style={{width:'200px'}}/>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <Button color="primary" onClick={()=>pictureInfomation(item)}>설명 입력</Button>
                                <Button color="secondary" onClick={()=>deleteHandler(item)}>삭제</Button>
                            </div>
                            <Divider/>
                        </div>
                    ))}    
                </Space>
                
            </div>
            </Col>
        {informationModalViewer && <PictureInfomationModal isOpen={informationModalViewer} ModalHandler={setinformationModalViewer} picture={fileInformation} pictureHandler={onPictureDescriptionHandler}/>}
        </Row>
    )
}

export default PictureUpload
