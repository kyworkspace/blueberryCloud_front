import { Checkbox } from 'antd';
import React, { memo, useContext, useState } from 'react'
import { CloudBoardContext } from './CloudViewer';
import { dateToString, FileDownload } from '../../../utils/commonMethod';
import { calcUnit } from '../../../utils/fileSizeUnit';
import { mimeTypeFinder } from '../../../utils/mimeTypeAsset';
import url from '../../../route/DevUrl';

const CloudFileCard = memo((props) =>{
    const {openFolder,onFileDetail,SelectionMode,Files,setFiles} = useContext(CloudBoardContext)
    const {item} = props;
    const [checked, setChecked] = useState(item.checked);
    const onCheckboxHandler =(e)=>{
        setChecked(!checked);
        let objList = [...Files];
        objList.forEach((obj)=>{
            if(obj._id === item._id){
                obj.selected = !checked;
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
    if(SelectionMode) cardEvent = onCheckboxHandler; //선택모드일때는 체크 여부만 확인
    return (
        <li className="file-box"
         style={{marginTop:'10px',marginLeft:'10px'}}
          key={item.filename} onClick={cardEvent} style={{cursor:'pointer'}}>
            {typeMainCategory[0] === 'video'?
            <div 
                className="file-top"
                style={{
                    height:'200px' 
                    , backgroundSize:'70%'
                    , backgroundPosition:'center'
                    , backgroundRepeat:'no-repeat'
                    }}
                >
                    <video src={`${url}/${item.logicPath}`} style={{width:'80%',maxHeight:'90%'}}/>
                    {SelectionMode && <i className="f-14 ellips" ><Checkbox onChange={onCheckboxHandler} checked={item.selected}/></i>}
            </div>
            :
                cardImage
            }
            <div className="file-bottom"  >
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
