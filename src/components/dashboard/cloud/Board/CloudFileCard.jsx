import { Checkbox } from 'antd';
import React, { memo, useContext, useState } from 'react'
import folderImage from '../../../../assets/images/dashboard/folder.png'
import { CloudBoardContext } from './CloudViewer';
import url from '../../../../route/DevUrl';
import { dateToString } from '../../../../utils/commonMethod';
import { calcUnit } from '../../../../utils/fileSizeUnit';

const CloudFileCard = memo((props) =>{
    const {openFolder,onFileDetail,SelectionMode,Files,setFiles} = useContext(CloudBoardContext)
    const {item} = props;
    
    const onCheckboxHandler =(e)=>{
        let objList = [...Files];
        objList.forEach((obj)=>{
            if(obj._id === item._id){
                obj.selected = e.target.checked;
            }
        });
        setFiles(objList);
    }

    let cardImage; //파일 이미지
    let cardText; //파일 설명
    let cardEvent; // 클릭 이벤트
    let type = item.mimetype.split("/");
    switch (type[0]) {
        case "Folder":
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
                   {SelectionMode && <i className="f-14 ellips" style={{cursor:'pointer'}}><Checkbox /></i>}
                </div>
            );
            cardText = "폴더";
            cardEvent = ()=>{openFolder(`${item.cloudpath}/${item.filename}`)}
            break;
        case "image":
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
                        {SelectionMode && <i className="f-14 ellips" style={{cursor:'pointer'}}><Checkbox onChange={onCheckboxHandler} checked={item.selected}/></i>}
                </div>
                    );
                cardText = dateToString(item.createdAt,true)
                cardEvent = ()=>{onFileDetail(item)};
                break;
            case "video":
                cardImage =(
                    <div 
                        className="file-top"
                        style={{
                            backgroundImage:`url(${url}/${item.thumbnailpath})`
                            , height:'200px' 
                            , backgroundSize:'70%'
                            , backgroundPosition:'center'
                            , backgroundRepeat:'no-repeat'
                            }}
                        >
                            {SelectionMode && <i className="f-14 ellips" style={{cursor:'pointer'}}><Checkbox onChange={onCheckboxHandler} checked={item.selected}/></i>}
                    </div>
                        );
                    cardText = dateToString(item.createdAt,true)
                    cardEvent = ()=>{onFileDetail(item)};
                break;
        default:
            cardImage = (
                <div  className="file-top" style={{height:'200px' }}>
                    {SelectionMode && <i className="f-14 ellips" style={{cursor:'pointer'}}><Checkbox onChange={onCheckboxHandler} checked={item.selected}/></i>}
                </div>
                );
            cardText = dateToString(item.createdAt,true);
            cardEvent = ()=>{alert("오류가 발생한 파일입니다.")}
            break;
    }
    return (
        <li className="file-box" style={{width:`calc(20% - 15px)`,marginTop:'10px',marginLeft:'10px'}} key={item.filename}>
            {cardImage}
            <div className="file-bottom" onClick={cardEvent} style={{cursor:'pointer'}}>
                <div style={{whiteSpace:'nowrap' , overflow:'hidden', textOverflow:'ellipsis', width:150}}>
                    <h6>{item.originalname}</h6>
                </div>
                {item.mimetype === "Folder" ?
                    <>
                        <p className="mb-1">&nbsp;</p>
                        <p><b>{cardText}</b></p>
                    </>
                :
                    <>
                        <p className="mb-1">용량 : {calcUnit(item.size)}</p>
                        <p><b>{cardText}</b></p>
                    </>
                }
            </div>
          </li>
    )
})

export default CloudFileCard
