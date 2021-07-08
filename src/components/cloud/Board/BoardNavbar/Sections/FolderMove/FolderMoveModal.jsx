import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import {Modal,ModalHeader,ModalBody, ModalFooter, Button, Row, Col} from 'reactstrap'
import { errorMessage, successMessage } from '../../../../../../utils/alertMethod';
import { filePathMove, getFolderList } from '../../../../../../utils/commonMethod';
import folderImage from '../../../../../../assets/images/dashboard/folder.png'
import { CloudBoardContext } from '../../../CloudViewer';

const FolderMoveModal=memo((props) =>{
    const {Files,selectFileList} = useContext(CloudBoardContext)
    const {isOpen, className,ModalHandler} = props;
    const [Loading, setLoading] = useState(false);
    const [selectedPath, setSelectedPath] = useState('ALL')
    const [folderList, setFolderList] = useState([]);
    const prevFolder = useRef();

    useEffect(() => {
        getFolderListHandler(selectedPath);
    }, [isOpen])

    const onCloseModal = () => {
        ModalHandler(false)
    };
    const onConfirmModal =()=>{
        const  selectedFiles = Files.filter((item)=>item.selected);
        const body={
            path:selectedPath,
            fileList : selectedFiles
        }
        filePathMove(body).then(success=>{
            successMessage(`${selectedFiles.length}개의 파일이 이동 되었습니다.`);
            selectFileList(1);
        })
        console.log(selectedPath,'저장')
    }
    const getFolderListHandler =(path)=>{
        const body={
            path
        }
        getFolderList(body).then(list=>{
            setFolderList(list);
        })
        .catch(err=>{
            errorMessage("폴더 목록을 불러오던 중 오류가 발생하였습니다.")
        })
    }
    const onFolderMove=(value)=>{
        const newPath = selectedPath+'/'+value.filename;
        setSelectedPath(newPath);
        getFolderListHandler(newPath);
    }
    const onFolderSelected=(value)=>{
        let newList = [...folderList];
        newList.map(item=>{
            if(item._id === value._id){
                item.selected = true;
            }else{
                item.selected = false;
            }
        });
        setFolderList(newList);
        if(prevFolder.current) prevFolder.current.style.border = '1px solid lightgray';
    }
    const onPrevFolderMove=()=>{
        let newPathList = selectedPath.split('/');
        newPathList.pop();
        const newPath = newPathList.join('/');
        setSelectedPath(newPath);
        getFolderListHandler(newPath);
    }
    const onPrevFolderSelected=()=>{
        let newList = [...folderList];
        newList.map(item=>{
            item.selected = false;
        });
        setFolderList(newList);
        prevFolder.current.style.border = '2px solid black';
    }
    return (
        <Modal isOpen={isOpen} className={className} style={{width:'600px',maxWidth:'90%'}}>
            <ModalHeader toggle={onCloseModal}>파일 이동</ModalHeader>
            <ModalBody>
                <div>현재 폴더경로 : {selectedPath}</div>
                <div style={{width:'100%', height:'20rem',backgroundColor:'white', border:'2px solid lightgray', padding:'2%'}}>
                    <Row>
                        {selectedPath !== "ALL" &&
                            <Col md="3" xs="6" onDoubleClick={onPrevFolderMove} onClick={onPrevFolderSelected}>
                                <div ref={prevFolder} style={{width:'100%', height:'5rem', border:`1px solid lightgray`, display:'flex', justifyContent:'center'}}>
                                    <img src={folderImage} style={{maxWidth:'95%', maxHeight:'95%'}}/>
                                </div>  
                                <div style={{display:'flex', justifyContent:'center'}}>이전 폴더로 이동</div>
                            </Col>
                        }
                        {folderList.map((item,idx)=>{
                            return (
                                <Col md="3" xs="6" key={item._id}  onDoubleClick={()=>onFolderMove(item)} onClick={()=>onFolderSelected(item)}>
                                    <div style={{width:'100%', height:'5rem', border:` ${item.selected ?'2px solid black' :'1px solid lightgray'}`, display:'flex', justifyContent:'center'}}>
                                        <img src={folderImage} style={{maxWidth:'95%', maxHeight:'95%'}}/>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'center'}}>{item.filename}</div>
                                </Col>
                            )    
                        })}
                        
                    </Row>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onConfirmModal} disabled={Loading}>확인</Button>{' '}
                <Button color="secondary" onClick={onCloseModal}>취소</Button>
            </ModalFooter>
        </Modal>
    )
})

export default FolderMoveModal
