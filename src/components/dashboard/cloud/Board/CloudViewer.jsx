import React, { createContext, Fragment, useContext, useEffect, useRef, useState } from 'react'
import BoardNavbar from './BoardNavbar/BoardNavbar'
import Breadcrumb from '../../../../layout/breadcrumb'
import {Container,Row,Col,Card,CardText,CardBody,CardImg,CardSubtitle,CardTitle, Button, Alert,Nav} from 'reactstrap';

import folderImage from '../../../../assets/images/dashboard/folder.png'
import axios from 'axios';
import { CLOUD_API, FOLDER_API } from '../../../../route/Apis';
import { toast } from 'react-toastify';
import { dateToString, openNotification } from '../../../../utils/commonMethod';


import url from '../../../../route/DevUrl'
import CloudDetailModal from './CloudDetailModal';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setFolderRoute } from '../../../../redux/folder/_actions/folder_actions';

export const CloudBoardContext=createContext({
    refreshFileList :()=>{}
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
    const folderPathRef = useRef(folderPath);
    //페이지 state
    const [limit, setLimit] = useState(18);
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal]= useState(1);
    

    useEffect(() => {
        selectFileList(1);
    }, [theme])
    //파일 상세
    const onFileDetail = (file)=>{
        setDetailModal(true);
        setSelectedFile(file);
    }
    //폴더일때 상세 -> 상세 폴더로 경로 이동
    const openFolder = (path)=>{
        dispatch(setFolderRoute(path))
        folderPathRef.current = path
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
            cloudpath : folderPathRef.current, //폴더 경로
        };
        axios.post(`${CLOUD_API}/files/list`,body)
        .then(response => {
            if(response.data.success){
                setFiles(response.data.fileList);
                setTotal(response.data.totalCount)
                toast.success("불러오기 성공 !", {position: toast.POSITION.BOTTOM_RIGHT,autoClose:3000})
                setCurrentPage(page)
                setSkip(page-1*limit);

            }else{
                toast.error("불러오기 실패ㅠㅠ", {position: toast.POSITION.BOTTOM_RIGHT,autoClose:3000})
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
                    style = {{
                        display : 'flex',
                        justifyContent : 'center',
                        height : '200px',
                        marginTop:'15px'
                    }}
                >
                    <img src={folderImage}/>
                </div>
            );
            cardText = <div>폴더</div>
            cardEvent = ()=>{openFolder(`${item.cloudpath}/${item.filename}`)}
        }else{ //타입이 폴더가 아닐때
            cardImage =(
            <div 
                style={{backgroundImage:`url(${url}/${item.originalpath.replace(/\\/g, "/")})`
                    , height:'200px' 
                    , backgroundSize:'90%'
                    , backgroundPosition:'center'
                    , backgroundRepeat:'no-repeat'
                    , marginTop:'15px'}}
                >
            </div>
                );
            cardText = <CardText>{dateToString(item.createdAt)}</CardText>
            cardEvent = ()=>{onFileDetail(item)};
        }
        return(
        <Col xs="4" sm="3"  md="2"  key={item.filename}>
            <Card key = {item.filename} style={{cursor:'pointer'}} onClick={cardEvent}>
                {cardImage}
                <CardBody>
                <CardTitle>
                    <div style={{whiteSpace:'nowrap' , overflow:'hidden', textOverflow:'ellipsis', width:150}}>
                    {item.filename}
                    </div>
                </CardTitle>
                {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
                <CardText>{cardText}</CardText>
                </CardBody>
            </Card>
          </Col>
    )})

    //파일 새로고침 용도
    const contextValue = {refreshFileList}
    
    return (
        <Fragment>
        <CloudBoardContext.Provider value={contextValue}>
         <Breadcrumb parent="Cloud" title={title}/>
         <BoardNavbar/>
          <Container fluid={true}>
            <Row>
                {renderFileList}
                <Col xl="12" className="m-t-30">  
                    <Nav style={{display:'flex', justifyContent:"center", paddingBottom:'20px'}}>
                    <Pagination  current={currentPage} onChange={selectFileList} total={total} pageSize={limit} showSizeChanger={false}/>
                    </Nav>
                </Col>
            </Row>
          </Container>
             {DetailModal && <CloudDetailModal file={SelectedFile} ModalHandler={setDetailModal} isOpen={DetailModal}/>}
        </CloudBoardContext.Provider>
         </Fragment> 
    )
}

export default CloudViewer
