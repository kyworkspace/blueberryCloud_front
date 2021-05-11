import React, { useState } from 'react'
import { Col, Row } from 'reactstrap';
import {Mail} from 'react-feather';

function UserInfoFirst(props) {

    const {email,bod,telNo,location,name,job} = props;
    const [iconSize, setIconSize] = useState('13px');
    
    return (
        <Row>
            <Col sm="6" lg="4" className="order-sm-1 order-xl-0">
                <Row >
                <Col md="6">
                    <div className="ttl-info text-left">
                    <h6><Mail size={iconSize}/> E-mail</h6><span>{email ? email : "비공개"}</span>
                    </div>
                </Col>
                <Col md="6">
                    <div className="ttl-info text-left ttl-sm-mb-0">
                    <h6><i className="fa fa-calendar"></i>  Birth Day</h6><span>{bod ? bod : "비공개"}</span>
                    </div>
                </Col>
                </Row>
            </Col>
            <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
                <div className="user-designation">
                <div className="title"><a target="_blank" href="#javascript">{name}</a></div>
                <div className="desc mt-2">{job}</div>
                </div>
            </Col>
            <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
                <Row>
                <Col md="6">
                    <div className="ttl-info text-left ttl-xs-mt">
                    <h6><i className="fa fa-phone"></i>   연락처</h6><span>{ telNo ? telNo : '비공개'}</span>
                    </div>
                </Col>
                <Col md="6">
                    <div className="ttl-info text-left ttl-sm-mb-0">
                    <h6><i className="fa fa-location-arrow"></i>   거주지</h6><span>{location ? location : '비공개' }</span>
                    </div>
                </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default UserInfoFirst
