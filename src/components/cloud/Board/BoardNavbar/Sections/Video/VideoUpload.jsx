import React, { memo, useState } from 'react'
import Dropzone from 'react-dropzone';
import {videoInsert,makeThumbnail} from '../../../../../../utils/commonMethod'
import {VideoCameraAddOutlined} from '@ant-design/icons'
import url from '../../../../../../route/DevUrl';
import { Col, Row } from 'antd';
import socketIOClient from "socket.io-client";
import ss from 'socket.io-stream';
import { Progress } from 'reactstrap';

const VideoUpload=memo((props) =>{
    const {onFileInfoHandler,onThumbnailHandler,loading,setLoading} = props;
    const [ThumbnailPath, setThumbnailPath] = useState("");
    const [percentage, setPercentage] = useState(0);
    const [fileInfo,setFileInfo] = useState();
    // const [Duration, setDuration] = useState("");
    // const [FilePath, setFilePath] = useState("");
    const onDrop = (files) => {
        setLoading(true);
        onFileInfoHandler(files[0]); //메타데이터
        setFileInfo(files[0]);
        console.log(files[0]);

        let uploadSize = 0;
        const Allsize = files[0].size;
        const fn = files[0];
        const socket = socketIOClient(url);
        let stream = ss.createStream();

        const filename = fn.name; //파일명

        ss(socket).emit('upload', stream,{filename});
        var blob = ss.createBlobReadStream(fn);
        blob.on('data', function (chunk) {
            uploadSize += chunk.length;
            setPercentage((uploadSize / Allsize) * 100);
            if(uploadSize === Allsize){
                setLoading(false);
            }
        })
        blob.pipe(stream);

        // videoInsert(files).then(response=>{
        //     if (response.data.success) {
        //         const fileInfo = response.data.fileInfo;
        //         //server 부분에 routes에 설정 추가
        //         // setFilePath(fileInfo.path); //동영상 경로 가져옴
        //         // onFileInfoHandler(fileInfo);
        //         //썸네일 제작
        //         const variable = { //썸네일 제작 매개변수
        //             url: fileInfo.path,
        //             fileName: fileInfo.filename
        //         }
        //         makeThumbnail(variable).then(response=>{
        //             if (response.data.success) { //성공하면
        //                 const {url,filenames,physicalPath} = response.data
        //                 // setDuration(response.data.fileDuration); //안에 들어가 있는건 동영상 길이 현재 안씀
        //                 setThumbnailPath(url); //썸네일로 나온 파일 패스
        //                 onThumbnailHandler(physicalPath,filenames[0]); //썸네일 물리 경로 => 저장할때 변경되는 정보
        //                 //let convertedFileInfo = {...fileInfo, path : newFilePath}
        //                 onFileInfoHandler(fileInfo);
        //                 setLoading(false);
        //             } else {
        //                 alert("썸네일 생성에 실패 했습니다.");
        //                 setLoading(false);
        //             }
        //         })
        //     } else {
        //         alert('비디오 업로드 실패')
        //         setLoading(false);
        //     }
        // })
    }


    return (
        <Row gutter={[50,16]}>
            {
                loading && 
                <Col xs={24}>
                    <Progress animated color="info" value={percentage} >{percentage.toFixed(2)}%</Progress>
                </Col>
            }
            
            
            <Col xs={24} style={{display:'grid', justifyContent:'center'}}>
                {/* DROP ZONE */}
                { fileInfo ?
                    loading ?
                    `열심히 업로드 중입니다. :)`
                    :
                    <video src={`${url}/uploads/tempfolder/${fileInfo.name}`} controls width={500}/>
                :
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false} /** 한번에 파일을 하나만 할건지 여러개 할건지 **/
                        disabled={loading}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()} accept='video/*'/>
                                <VideoCameraAddOutlined style={{ fontSize: '3rem' }}/>
                            </div>
                        )}
                    </Dropzone>
                }
                    
            </Col>
            {/* <Col xs={24} xl={12}>
                    <div>
                        <div style={{display:'flex',justifyContent : 'center',maxWidth:"250px",maxHeight:'280px'}}>
                        썸네일(Auto)
                        </div>
                        <br/>
                        {loading ? 
                            <>
                                <h6 className="sub-title mb-0 text-center">Upload & Encoding...</h6>
                                <div className="loader-box">
                                    <div className="loader-4"></div>
                                </div>
                            </>

                        :
                            <div style={{display:'flex',justifyContent : 'center', alignItems: 'center'}}>
                                {ThumbnailPath &&
                                    <img src={`${url}/${ThumbnailPath}`} alt="Thumnail" style={{maxWidth:'250px', maxHeight:'180px'}}>
                                    </img>
                                }
                            </div>
                        }
                    </div>
            </Col> */}
        </Row>
    )
})

export default VideoUpload
