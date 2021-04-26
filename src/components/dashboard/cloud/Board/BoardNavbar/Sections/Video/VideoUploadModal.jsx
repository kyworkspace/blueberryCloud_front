import React, { memo, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import {Modal,ModalHeader,ModalBody, ModalFooter, Button} from 'reactstrap'
import { CloudBoardContext } from '../../../CloudViewer'
import VideoUpload from './VideoUpload';
import CKEditors from "react-ckeditor-component";
import { Table } from 'react-bootstrap';
import { calcUnit } from '../../../../../../../utils/fileSizeUnit';
import { dateToString, uploadVideo } from '../../../../../../../utils/commonMethod';
import { toast } from 'react-toastify';

const VideoUploadModal=memo((props) =>{

    const {buttonLabel,className,isOpen,ModalHandler} = props;

    const user = useSelector(state => state.user)
    const folderPath = useSelector(state => state.folder.path)
    const {refreshFileList} = useContext(CloudBoardContext)
    const [Description, setDescription] = useState(""); //설명
    const [Tags, setTags] = useState([]);
    const [FileInfo, setFileInfo] = useState({});
    const [ThumbnailPath, setThumbnailPath] = useState("")
    const [ThumbnailName, setThumbnailName] = useState('')

    const onCloseModal = () => {
        ModalHandler(false)
    };

    const onConfirmModal = () => {
        
        let cloudPath = folderPath;
        let originalpath = cloudPath.split("/")
        originalpath[0] = user.userData._id; //루트 폴더명으로 바꿔줌

        let body ={
            ...FileInfo,
            description : Description,
            writer : user.userData._id,
            originalpath : `${originalpath.join("/")}/${dateToString(new Date(),false)}`,
            cloudpath : folderPath,
            thumbnailpath: ThumbnailPath,
            thumbnailname : ThumbnailName
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
    const onFileInfoHandler=(fileInfo)=>{
        setFileInfo(fileInfo);
    }
    const onThumbnailHandler=(path,name)=>{
        setThumbnailPath(path);
        setThumbnailName(name);
    }
    const onDescHandler =(evt)=>{
        const newContent = evt.editor.getData();
        setDescription(newContent);
    }

    return (
        <>
        <Modal isOpen={isOpen} className={className} style={{minWidth:'600px'}}>
            <ModalHeader toggle={onCloseModal}>동영상 업로드</ModalHeader>
            <ModalBody>
            <VideoUpload onFileInfoHandler={onFileInfoHandler} onThumbnailHandler={onThumbnailHandler}/>
            <Table responsive="md">
                <tr>
                    <td>제목</td>
                    <td>{FileInfo.originalname}</td>
                    <td>확장자</td>
                    <td>{FileInfo.mimetype}</td>
                </tr>
                <tr>
                    <td>용량</td>
                    <td colSpan="3">{calcUnit(FileInfo.size ? FileInfo.size : 0)}</td>
                </tr>
                <tr>
                    <td>태그 추가</td>
                    <td colSpan="3">{FileInfo.mimetype}</td>
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
            <Button color="primary" onClick={onConfirmModal}>저장</Button>{' '}
            <Button color="secondary" onClick={onCloseModal}>취소</Button>
            </ModalFooter>
        </Modal>
        </>
    )
})

export default VideoUploadModal
