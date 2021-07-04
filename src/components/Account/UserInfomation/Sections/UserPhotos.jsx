import React, { memo } from 'react'
import {Col,Card,CardHeader,CardBody,Media} from 'reactstrap';
import htmlParser from 'html-react-parser';
import url from '../../../../route/DevUrl'
import { infoMessage } from '../../../../utils/alertMethod';

const UserPhotos=memo((props) =>{
    const {item, photoSelect,idx} = props;
    const Selected = ()=>{
        // photoSelect();   
        infoMessage('상세보기 기능은 빠른시일내에 추가 하겠습니다.')
    }

    return (
        <>
            <figure className="col-xl-3 col-sm-6">
                <a href="#javascript">
                    {item.mimetype.indexOf('image') > -1 ?
                    <Media
                        src={`${url}/${item.logicPath}`}
                        alt="Gallery"
                        className="img-thumbnail"
                        onClick={Selected}
                        style={{maxHeight:'10rem'}}
                        middle
                    />
                    :
                    <div style={{display:'grid', justifyContent:'center'}}>
                        <video 
                            style={{maxHeight:'10rem'}}
                            src={`${url}/${item.logicPath}`} 
                            controls
                        />
                    </div>
                    
                }
                
                <div className="caption">
                    <h4>{item.originalname}</h4>
                    <p style={{whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{htmlParser(item.description)}</p>
                </div>
                </a>
            </figure>
        </>
    )
})

export default UserPhotos
