import React, { createContext, Fragment, useContext, useEffect, useState } from 'react'
import BoardNavbar from './BoardNavbar/BoardNavbar'
import Breadcrumb from '../../../../layout/breadcrumb'
import {Container,Row,Col,Card,CardText,CardBody,CardImg,CardSubtitle,CardTitle, Button, Alert} from 'reactstrap';

import image from '../../../../assets/images/product/1.png'
import axios from 'axios';
import { CLOUD_API } from '../../../../route/Apis';
import { toast } from 'react-toastify';
import { dateToString, openNotification } from '../../../../utils/commonMethod';


import url from '../../../../route/DevUrl'
import CloudDetailModal from './CloudDetailModal';

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

    useEffect(() => {
        selectFileList(theme);
    }, [theme])

    const selectFileList =(theme)=>{
        let body ={

        };
        axios.post(`${CLOUD_API}/files/list`,body)
        .then(response => {
            if(response.data.success){
                setFiles(response.data.fileList);
                toast.success("불러오기 성공 !", {position: toast.POSITION.BOTTOM_RIGHT,autoClose:3000})
            }else{
                toast.error("불러오기 실패ㅠㅠ", {position: toast.POSITION.BOTTOM_RIGHT,autoClose:3000})
            }
        })
    }
    const onFileDetail = (file)=>{
        setDetailModal(true);
        setSelectedFile(file);
    }
    const refreshFileList=()=>{
        selectFileList(theme);
    }

    const renderFileList = Files.map((item,idx)=>(
        <Col xs="4" sm="3"  md="2" >
            <Card key = {item.filename} style={{cursor:'pointer'}} onClick={()=>onFileDetail(item)}>
                <CardImg top height='200' src={`${url}/${item.path}`} alt="Card image cap" />
                <CardBody onClick={()=>{console.log("bbb")}}>
                <CardTitle>
                    <div style={{whiteSpace:'nowrap' , overflow:'hidden', textOverflow:'ellipsis', width:150}}>
                    {item.filename}
                    </div>
                </CardTitle>
                {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
                <CardText>{dateToString(item.createdAt)}</CardText>
                </CardBody>
            </Card>
          </Col>
    ))
    const contextValue = {refreshFileList}
    return (
        <Fragment>
        <CloudBoardContext.Provider value={contextValue}>
         <Breadcrumb parent="Cloud" title={title}/>
         <BoardNavbar/>
          <Container fluid={true}>
            <Row>
                {renderFileList}
            </Row>
          </Container>
             {DetailModal && <CloudDetailModal file={SelectedFile} ModalHandler={setDetailModal} isOpen={DetailModal}/>}
        </CloudBoardContext.Provider>
         </Fragment> 
    )
}

export default CloudViewer
