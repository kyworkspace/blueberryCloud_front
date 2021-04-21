import React, { createContext, Fragment, useContext, useEffect, useRef, useState } from 'react'
import BoardNavbar from './BoardNavbar/BoardNavbar'
import Breadcrumb from '../../../../layout/breadcrumb'
import {Container,Row,Col,Card,CardText,CardBody,CardImg,CardSubtitle,CardTitle, Button, Alert,Nav} from 'reactstrap';

import folderImage from '../../../../assets/images/dashboard/folder.png'
import axios from 'axios';
import { CLOUD_API, FOLDER_API } from '../../../../route/Apis';
import { toast } from 'react-toastify';
import { dateToString, openNotification } from '../../../../utils/commonMethod';
import { SettingOutlined } from '@ant-design/icons';

import url from '../../../../route/DevUrl'
import CloudDetailModal from './CloudDetailModal';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setFolderRoute } from '../../../../redux/folder/_actions/folder_actions';

export const CloudBoardContext=createContext({
    refreshFileList :()=>{},
})

const  CloudViewer =(props) =>{
    const theme = props.match.params.theme;
    let title = "";
    switch (theme) {
        case "all":
            title = "모든 파일"
            break;
        case "pictures":
            title = "사진 모아보기"
        break;
        case "videos":
            title = "동영상 모아보기"
        break;
    
        default:
            break;
    }
    const [Files, setFiles] = useState([]);
    const [SelectedFile, setSelectedFile] = useState({});
    const [DetailModal, setDetailModal] = useState(false);

    //폴더 경로 state
    const dispatch = useDispatch();
    const folderPath = useSelector(state => state.folder.path)
    //페이지 state
    const [limit, setLimit] = useState(20);
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal]= useState(1);
    

    useEffect(() => {
        selectFileList(1);
    }, [theme,folderPath])
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
            limit : limit,
            skip : (page-1)*limit,
            cloudpath : folderPath, //폴더 경로
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
        let cardImage; //파일 이미지
        let cardText; //파일 설명
        let cardEvent; // 클릭 이벤트
        if(item.mimetype === "Folder") { //타입이 폴더 일때
            cardImage = (
                <div
                    className="file-top"
                    style = {{
                        height : '200px',
                        backgroundImage:`url(${folderImage})`,
                        backgroundSize:'70%',
                        backgroundPosition:'center',
                        backgroundRepeat:'no-repeat'
                    }}
                >
                    <i className="fa fa-ellipsis-v f-14 ellips" style={{cursor:'pointer'}}></i>
                </div>
            );
            cardText = "폴더";
            cardEvent = ()=>{openFolder(`${item.cloudpath}/${item.filename}`)}
        }else{ //타입이 폴더가 아닐때
            cardImage =(
            <div 
                className="file-top"
                style={{
                    backgroundImage:`url(${url}/${item.originalpath.replace(/\\/g, "/")})`
                    , height:'200px' 
                    , backgroundSize:'70%'
                    , backgroundPosition:'center'
                    , backgroundRepeat:'no-repeat'
                    }}
                >
                    <i className="fa fa-ellipsis-v f-14 ellips" style={{cursor:'pointer'}}></i>
            </div>
                );
            cardText = dateToString(item.createdAt)
            cardEvent = ()=>{onFileDetail(item)};
        }
        return(
          <li className="file-box" style={{width:`calc(20% - 15px)`,marginTop:'10px',marginLeft:'10px'}} key={item.filename}>
            {cardImage}
            <div className="file-bottom" onClick={cardEvent} style={{cursor:'pointer'}}>
                <div style={{whiteSpace:'nowrap' , overflow:'hidden', textOverflow:'ellipsis', width:150}}>
                    <h6>{item.filename}</h6>
                </div>
                {item.mimetype === "Folder" ?
                    <>
                        <p className="mb-1">&nbsp;</p>
                        <p><b>{cardText}</b></p>
                    </>
                :
                    <>
                        <p className="mb-1">용량 : {item.size}</p>
                        <p><b>{cardText}</b></p>
                    </>
                }
            </div>
          </li>
    )})

    //파일 새로고침 용도
    const contextValue = {refreshFileList}
    
    return (
        <Fragment>
        <CloudBoardContext.Provider value={contextValue}>
            <Container fluid={true}>
                
                <Col xl="12" md="12" className="box-col-12">
                    <div className="file-content">
                    <Card>
                    <Breadcrumb parent="Cloud" title={title}/>
                    <BoardNavbar/>
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
