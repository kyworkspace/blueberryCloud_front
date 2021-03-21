import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { pictureInsert } from '../../utils/commonMethod'
import Image from 'react-bootstrap/Image'
import { Badge } from 'react-bootstrap'
import {X} from 'react-feather'
import { Button } from 'reactstrap'
import PictureInfomationModal from '../dashboard/cloud/Board/BoardNavbar/Sections/PictureInfomationModal'

const PictureUpload=(props) =>{
    const [Files, setFiles] = useState([])
    const [information, setInformation] = useState({});
    const [informationModalViewer, setinformationModalViewer] = useState(false);
    useEffect(() => {
        
    }, [])


    const onDropHandler = async (files)=>{
        const uploadFileList = await Promise.all(
            files.map(file=>{
                return pictureInsert(file).then(response=>{return response.data.fileInfo});
            })
        )
        setFiles([...Files,...uploadFileList])

        //props.refreshFunction([...Files,...uploadFileList])
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
        //props.refreshFunction(newImages);
    }
    const pictureInfomation=(item)=>{
        
        alert('사진 상세 정보');
        setInformation(item)
        setinformationModalViewer(true);


    }


    return (
        <div>
            <div style={{ display:'flex'}}>
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
                    <br/>
                    <p>목록에서 사진을 클릭하면 삭제됩니다.</p>
                </div>
                </section>
            )}
            </Dropzone>
            <div style={{display:'grid', width:"250px",height:'280px',overflowY:'scroll'}}>
                {Files.map((item,index)=>(
                    <>
                    
                    <div key={index} style={{margin:'10px'}} >
                        {/* <img style={{width:'200px'}}
                        src = {`http://localhost:5000/${item.path||item.file_path}`}
                        /> */}
                        
                            <Image src = {`http://localhost:5000/${item.path||item.file_path}`} rounded style={{width:'200px'}}/>
                        <Button color="primary" onClick={()=>pictureInfomation(item)}>상세정보</Button>
                        <Button color="secondary" onClick={()=>deleteHandler(item)}>삭제</Button>
                    </div>
                    <br/>
                    </>
                ))}
            </div>
        </div>
        {informationModalViewer && <PictureInfomationModal isOpen={informationModalViewer} ModalHandler={setinformationModalViewer} picture={information}/>}
        </div>
    )
}

export default PictureUpload
