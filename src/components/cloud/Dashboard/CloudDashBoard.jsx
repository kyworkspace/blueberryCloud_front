import React, { Fragment, memo, useState } from 'react'
import Breadcrumb from '../../../layout/breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap';
import CloudUseGraph from './Sections/UseGraph/CloudUseGraph';
import ShareGraph from './Sections/UserShareGraph/ShareGraph';
import Status from './Sections/UserStatus/Status';
import { useSelector } from 'react-redux';

const CloudDashBoard = memo((props) =>{
  const user = useSelector(state => state.user);


  if(user.userData){
    return (
        <Fragment>
        <Breadcrumb parent="Cloud" title="CLOUD PLAN"/>
          <Container fluid={true}>
            <Row className="second-chart-list third-news-update">
              <Status/>
              <CloudUseGraph user = {user.userData}/>
              <ShareGraph cloudSize = {user.userData.cloudSize}/>
            </Row>
          </Container>   
        </Fragment> 
    )
  }else{
    return <div>로딩중</div>
  }
    
})

export default CloudDashBoard
