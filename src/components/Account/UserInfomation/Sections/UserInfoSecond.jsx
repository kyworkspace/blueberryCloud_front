import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap';
import {Users,FilePlus,Globe,ThumbsUp} from 'react-feather'

function UserInfoSecond(props) {
    const {friends, fileCount , uploadTerm} = props;
    const [iconSize, setIconSize] = useState('13px');
    return (
        <Row>
            <Col sm="6" lg="4" className="order-sm-1 order-xl-0">
                <Row >
                <Col md="6">
                    <div className="ttl-info text-left">
                    <h6><Users size={iconSize}/> 친구</h6><span>{friends ? friends+" 명" : '비공개'}</span>
                    </div>
                </Col>
                <Col md="6">
                    <div className="ttl-info text-left ttl-sm-mb-0">
                    <h6><FilePlus size={iconSize}/> 파일</h6><span>{fileCount ? fileCount+" 개 ":'비공개'} </span>
                    </div>
                </Col>
                </Row>
            </Col>
            <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
                
            </Col>
            <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
                <Row>
                <Col md="6">
                    <div className="ttl-info text-left ttl-xs-mt">
                    <h6><Globe size={iconSize}/>   파일 업로드 기간</h6><span>{uploadTerm ? uploadTerm :'비공개'}</span>
                    </div>
                </Col>
                <Col md="6">
                    <div className="ttl-info text-left ttl-sm-mb-0">
                    <h6><ThumbsUp size={iconSize}/>  알파</h6><span>{'클라우드 등급'}</span>
                    </div>
                </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default UserInfoSecond
