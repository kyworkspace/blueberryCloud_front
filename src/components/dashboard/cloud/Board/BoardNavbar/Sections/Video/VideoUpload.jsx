import React, { memo, useState } from 'react'
import Dropzone from 'react-dropzone';
import {videoInsert,makeThumbnail} from '../../../../../../../utils/commonMethod'
import {VideoCameraAddOutlined} from '@ant-design/icons'
import url from '../../../../../../../route/DevUrl';

const VideoUpload=memo((props) =>{
    const {onFileInfoHandler,onThumbnailHandler} = props;
    const [ThumbnailPath, setThumbnailPath] = useState("");
    // const [Duration, setDuration] = useState("");
    // const [FilePath, setFilePath] = useState("");
    const [FileUploading, setFileUploading] = useState(false)
    const onDrop = (files) => {
        setFileUploading(true);
        videoInsert(files).then(response=>{
            if (response.data.success) {
                const fileInfo = response.data.fileInfo;
                //server 부분에 routes에 설정 추가
                // setFilePath(fileInfo.path); //동영상 경로 가져옴
                // onFileInfoHandler(fileInfo);
                //썸네일 제작
                const variable = { //썸네일 제작 매개변수
                    url: fileInfo.path,
                    fileName: fileInfo.filename
                }
                makeThumbnail(variable).then(response=>{
                    if (response.data.success) { //성공하면
                        console.log(response.data);
                        const {url,filenames,newFilePath} = response.data
                        // setDuration(response.data.fileDuration); //안에 들어가 있는건 동영상 길이 현재 안씀
                        setThumbnailPath(response.data.url); //썸네일로 나온 파일 패스
                        onThumbnailHandler(url,filenames[0]); //썸네일 경로 => 저장할때 변경되는 정보
                        let convertedFileInfo = {...fileInfo, path : newFilePath}
                        onFileInfoHandler(convertedFileInfo);
                        setFileUploading(false);
                    } else {
                        alert("썸네일 생성에 실패 했습니다.");
                        setFileUploading(false);
                    }
                })
            } else {
                alert('비디오 업로드 실패')
                setFileUploading(false);
            }
        })
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* DROP ZONE */}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false} /** 한번에 파일을 하나만 할건지 여러개 할건지 **/
                        maxSize={1000000000} /** 파일 크기 **/
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

                    {/* 썸네일 있을때만 렌더링*/}
                    <div style={{width:'18vw'}}>
                        <div style={{display:'flex',justifyContent : 'center'}}>
                        썸네일(Auto)
                        </div>
                        <br/>
                        {FileUploading ? 
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
                </div>
    )
})

export default VideoUpload
