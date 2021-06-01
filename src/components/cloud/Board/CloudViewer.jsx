import React, { createContext, Fragment, useContext, useEffect, useRef, useState } from 'react'
import BoardNavbar from './BoardNavbar/BoardNavbar'
import Breadcrumb from '../../../layout/breadcrumb'
import {Container,Col,Card,CardBody,Nav} from 'reactstrap';
import axios from 'axios';
import { CLOUD_API } from '../../../route/Apis';
import { toast } from 'react-toastify';
import CloudDetailModal from './CloudDetailModal';
import { Empty, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setFolderRoute } from '../../../redux/folder/_actions/folder_actions';
import CloudFileCard from './CloudFileCard';

export const CloudBoardContext=createContext({
    SelectionMode : false,
    searchContents :{},
    Files:[],
    DetailModal : false,
    UpdateModal : false,
    SelectedFile : {},
    setSelectionMode :()=>{},
    refreshFileList :()=>{},
    openFolder :()=>{},
    onFileDetail :()=>{},
    setFiles:()=>{},
    selectedFileDelete :()=>{},
    setSearchContents:()=>{},
    selectFileList : ()=>{}
})

const  CloudViewer =(props) =>{
    const theme = props.match.params.theme;
    const [Files, setFiles] = useState([]);
    const [SelectedFile, setSelectedFile] = useState({});
    const [DetailModal, setDetailModal] = useState(false); //상세보기
    const [SelectionMode, setSelectionMode] = useState(false); //선택 모드

    //폴더 경로 state
    const dispatch = useDispatch();
    const folderPath = useSelector(state => state.folder.path)
    //페이지 state
    const [limit, setLimit] = useState(20);
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal]= useState(1);
    // 검색
    const [searchContents, setSearchContents] = useState({})

    useEffect(() => {
        selectFileList(1);
    }, [theme,folderPath,searchContents])

    //파일 상세
    const onFileDetail = (file)=>{
        setDetailModal(true);
        setSelectedFile(file);
    }
    
    //폴더일때 상세 -> 상세 폴더로 경로 이동
    const openFolder = (path)=>{
        dispatch(setFolderRoute(path))
        selectFileList(1)
    }
    //목록 리로딩
    const refreshFileList=()=>{
        selectFileList(1);
    }
    //페이징
    const selectFileList =(page)=>{
        let body ={
            theme : theme,
            limit : limit,
            skip : (page-1)*limit,
            cloudpath : folderPath, //폴더 경로
            searchContents : searchContents //검색항목
        };
        axios.post(`${CLOUD_API}/files/list`,body)
        .then(response => {
            if(response.data.success){
                setFiles(response.data.fileList);
                setTotal(response.data.totalCount)
                toast.success("불러오기 성공 !", {position: toast.POSITION.BOTTOM_RIGHT,autoClose:1500})
                setCurrentPage(page)
                setSkip(page-1*limit);

            }else{
                toast.error("불러오기 실패ㅠㅠ", {position: toast.POSITION.BOTTOM_RIGHT,autoClose:1500})
            }
        })
    }
    //파일목록 그리기
    const renderFileList = Files.map((item,idx)=>{
        return <CloudFileCard item={item} key={item._id}/>
    })

    //파일 삭제
    const selectedFileDelete=(body)=>{
        axios.post(`${CLOUD_API}/files/delete`,body)
         .then(response=>{
        if(response.data.success){
            selectFileList(1)
            toast.success(`${response.data.count} 건 삭제 완료`, {position: toast.POSITION.BOTTOM_RIGHT,autoClose:1500})
        }else{
            toast.error("삭제 실패", {position: toast.POSITION.BOTTOM_RIGHT,autoClose:1500})
        }
      })
    }
    //파일 검색
    const contextValue = {
        refreshFileList //파일 새로고침 용도
        ,searchContents //검색항목
        ,SelectionMode //선택모드
        ,Files
        ,SelectedFile
        ,setSelectionMode 
        ,openFolder 
        ,onFileDetail
        ,setFiles
        ,selectedFileDelete
        ,setSearchContents
        ,selectFileList
    }
    let title = "";
    switch (theme) {
        case "all":
            title = "모든 파일"
            break;
        case "image":
            title = "사진 모아보기"
            break;
        case "video":
            title = "동영상 모아보기"
            break;
        default:
            break;
    }

    return (
        <Fragment>
        <CloudBoardContext.Provider value={contextValue}>
        <Breadcrumb parent="Cloud" title={title}/>
            <Container fluid={true} >
                <Col xl="12" md="12" className="box-col-12">
                    <div className="file-content">
                    <Card>
                    <BoardNavbar/>
                    { Files.length > 0 ?
                        <>
                            <CardBody className="file-manager">
                                <ul className="files">
                                    {renderFileList}
                                </ul>
                            </CardBody>
                            <Col xl="12" className="m-t-30">  
                                <Nav style={{display:'flex', justifyContent:"center", paddingBottom:'20px'}}>
                                <Pagination  current={currentPage} onChange={selectFileList} total={total} pageSize={limit} showSizeChanger={false}/>
                                </Nav>
                            </Col>
                        </>
                        :
                        <CardBody className="file-manager" style={{height:'700px'}}>
                                <Empty description="파일이 없어요. 새로운 파일을 등록해주세요"/>
                        </CardBody>
                    }
                        
                    </Card>
                    </div>
                </Col>
            </Container>
            {DetailModal && <CloudDetailModal file={SelectedFile} ModalHandler={setDetailModal} isOpen={DetailModal}/>}
        </CloudBoardContext.Provider>
        </Fragment>
    )
}

export default CloudViewer
