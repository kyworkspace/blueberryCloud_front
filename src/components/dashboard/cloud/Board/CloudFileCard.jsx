import { Checkbox } from 'antd';
import React, { memo, useContext, useState } from 'react'
import folderImage from '../../../../assets/images/thumbnails/docx.png'
import { CloudBoardContext } from './CloudViewer';
import url from '../../../../route/DevUrl';
import { dateToString, FileDownload } from '../../../../utils/commonMethod';
import { calcUnit } from '../../../../utils/fileSizeUnit';
import { mimeTypeFinder } from '../../../../utils/mimeTypeAsset';

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
    let {type,image} = mimeTypeFinder(item);
    cardImage =(
        <div 
            className="file-top"
            style={{
                backgroundImage:image
                , height:'200px' 
                , backgroundSize:'70%'
                , backgroundPosition:'center'
                , backgroundRepeat:'no-repeat'
                }}
            >
                {SelectionMode && <i className="f-14 ellips" style={{cursor:'pointer'}}><Checkbox onChange={onCheckboxHandler} checked={item.selected}/></i>}
        </div>
        );
    let typeMainCategory = item.mimetype.split("/");
    switch (typeMainCategory[0]) {
        case "Folder":
            cardText = "폴더";
            cardEvent = ()=>{openFolder(`${item.cloudpath}/${item.filename}`)}
            break;
        case "image":
            cardText = dateToString(item.createdAt,true)
            cardEvent = ()=>{onFileDetail(item)};
            break;
        case "video":
            cardText = dateToString(item.createdAt,true)
            cardEvent = ()=>{onFileDetail(item)};
            break;
        case "audio":
            cardText = dateToString(item.createdAt,true)
            cardEvent = ()=>{onFileDetail(item)};
            break;
        default:
            cardText = dateToString(item.createdAt,true);
            cardEvent = ()=>{ FileDownload(item);}
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
