import React, { memo, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import {Modal,ModalHeader,ModalBody, ModalFooter, Button} from 'reactstrap'
import { CloudBoardContext } from '../../../CloudViewer'
import VideoUpload from './VideoUpload';
import CKEditors from "react-ckeditor-component";
import { Table } from 'react-bootstrap';
import { calcUnit } from '../../../../../../utils/fileSizeUnit';
import { dateToString, uploadVideo } from '../../../../../../utils/commonMethod';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { confirmMessage } from '../../../../../../utils/alertMethod';
const {Option} = Select;

const VideoUploadModal=memo((props) =>{

    const {buttonLabel,className,isOpen,ModalHandler} = props;

    const user = useSelector(state => state.user)
    const folderPath = useSelector(state => state.folder.path)
    const {refreshFileList} = useContext(CloudBoardContext)
    const [Description, setDescription] = useState(""); //설명
    const [Tags, setTags] = useState([]);
    const [FileInfo, setFileInfo] = useState({});
    const [FileUploading, setFileUploading] = useState(false);
    const [ThumbnailPath, setThumbnailPath] = useState("")
    const [ThumbnailName, setThumbnailName] = useState('')
    const [openrating, setOpenrating] = useState(2)

    const onCloseModal = () => {
        if(FileUploading){
            confirmMessage('파일이 전송중입니다 취소하시겠습니까?','실행','취소',()=>{
                ModalHandler(false)        
            })
        }
        ModalHandler(false)
    };

    const onConfirmModal = () => {
        
        let cloudPath = folderPath;
        let originalpath = cloudPath.split("/")
        originalpath[0] = user.userData._id; //루트 폴더명으로 바꿔줌

        let body ={
            size : FileInfo.size,
            filename : FileInfo.name,
            originalname : FileInfo.name,
            mimetype : FileInfo.type,
            description : Description,
            writer : user.userData._id,
            originalpath : `${originalpath.join("/")}/${dateToString(new Date(),false)}`,
            cloudpath : folderPath,
            thumbnailpath: ThumbnailPath,
            thumbnailname : ThumbnailName,
            openrating
        }
        console.log(body);
        uploadVideo(body).then(response=>{
            if(response.data.success){
                toast.success("업로드 성공 !", {position: toast.POSITION.BOTTOM_RIGHT,autoClose:2000})
                ModalHandler(false)
                refreshFileList();
            }else{
                alert(`업로드를 실패하였습니다.`)
            }
        })
    }
    const onThumbnailHandler=(path,name)=>{
        setThumbnailPath(path);
        setThumbnailName(name);
    }
    const onDescHandler =(evt)=>{
        const newContent = evt.editor.getData();
        setDescription(newContent);
    }
    const onRatingHandler=(value)=>{
        setOpenrating(value);
    }

    return (
        <>
        <Modal isOpen={isOpen} className={className} style={{width:'600px',maxWidth:'90%', fontFamily:'nanumL'}}>
            <ModalHeader toggle={onCloseModal}>동영상 업로드</ModalHeader>
            <ModalBody>
            <VideoUpload onFileInfoHandler={setFileInfo} onThumbnailHandler={onThumbnailHandler} loading={FileUploading} setLoading={setFileUploading}/>
            <Table responsive="md">
                <tr>
                    <td>제목</td>
                    <td>{FileInfo.name}</td>
                    <td>확장자</td>
                    <td>{FileInfo.type}</td>
                </tr>
                <tr>
                    <td>용량</td>
                    <td colSpan="3">{calcUnit(FileInfo.size ? FileInfo.size : 0)}</td>
                </tr>
                <tr>
                    <td>공개</td>
                    <td colSpan="3">
                        <Select value={openrating} onChange={onRatingHandler} style={{width:'200px'}}>
                                <Option value={2}>비공개</Option>
                                <Option value={1}>친구에게만</Option>
                                <Option value={0}>전체 공개</Option>
                        </Select>    
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <CKEditors
                            activeclassName="p10"
                            content={Description}
                            events={{
                                "change": onDescHandler
                            }}
                        />
                    </td>
                </tr>
                
            </Table>
            </ModalBody>
            <ModalFooter>
            <Button disabled={FileUploading} color="primary" onClick={onConfirmModal}>저장</Button>{' '}
            <Button color="secondary" onClick={onCloseModal}>취소</Button>
            </ModalFooter>
        </Modal>
        </>
    )
})

export default VideoUploadModal
