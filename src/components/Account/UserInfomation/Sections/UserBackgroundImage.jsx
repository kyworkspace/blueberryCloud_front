import { Space } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react'
import { Button, CardHeader } from 'reactstrap'
import url from '../../../../route/DevUrl';
import { errorMessage } from '../../../../utils/alertMethod';
import { changeProfileImage, profileInsert } from '../../../../utils/commonMethod';
const UserBackgroundImage=memo((props) =>{
    const {imageUrl, self} = props
    const [backgroundStyle, setBackgroundStyle] = useState({
        background:imageUrl ? `url(${url}/${imageUrl}) center/cover no-repeat`:`url(https://picsum.photos/1600/470)` ,
        padding:'0px',
        height: '470px',
    })
    const [modifyStyle, setModifyStyle] = useState(
        {
            display:'none',
            width:'100%', 
            height:'100%',
            backgroundColor: '#00000099',
            justifyContent : 'flex-end',
            alignItems : 'flex-start',
            padding:'20px'
        });
    // 파일 업로드
    const fileUploadRef = useRef();

    const readBackgroundUrl =(event)=>{
        profileInsert(event.target.files)
        .then(response=>{
          if(response.data.success){
            const {fileInfo} = response.data;
            // console.log(fileInfo)
            changeProfileImage(fileInfo,'background')
            .then(response=>{
              if(response.data.success){
                setBackgroundStyle({
                    background:`url(${url}/${response.data.url}) center/cover no-repeat`,
                    padding:'0px',
                    height: '470px',
                })
              }
            }).catch(err=>{
              errorMessage('오류가 발생하였습니다.')    
            })
          }
        }).catch(err=>{
          errorMessage('오류가 발생하였습니다.')
        })
      }
    const onBackgroundMouseEnter=()=>{
        setModifyStyle({
            ...modifyStyle,
            display:'flex'
        })
    };
    const onBackgroundMouseLeave =()=>{
        setModifyStyle({
            ...modifyStyle,
            display:'none'
        })
    }
    const onBackgroundModify =()=>{
        fileUploadRef.current.click();
    }

    return (
        <>
        <CardHeader
            style={backgroundStyle} 
            onMouseEnter={onBackgroundMouseEnter}
            onMouseLeave={onBackgroundMouseLeave}
        >
            {
                self &&
                <div style={modifyStyle}>
                    <Space size={10}>
                        <Button color="secondary" onClick={onBackgroundModify}>수정</Button>
                    </Space>
                </div>
            }
            
        </CardHeader>
        
        <input type="file" ref={fileUploadRef} accept="image/*" style={{display:'none'}} onChange={readBackgroundUrl}/>
        </>
    )
})

export default UserBackgroundImage
