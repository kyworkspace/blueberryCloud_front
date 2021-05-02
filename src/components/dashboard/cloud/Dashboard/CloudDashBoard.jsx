import React, { Fragment, memo, useState } from 'react'
import Breadcrumb from '../../../../layout/breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap';
import { Clock } from 'react-feather';
import CloudUseGraph from './Sections/UseGraph/CloudUseGraph';
import ShareGraph from './Sections/UserShareGraph/ShareGraph';
import Status from './Sections/UserStatus/Status';

const CloudDashBoard = memo((props) =>{

    return (
        <Fragment>
         <Breadcrumb parent="Cloud" title="CLOUD PLAN"/>
          <Container fluid={true}>
            <Row className="second-chart-list third-news-update">
              <Status/>
              <CloudUseGraph/>
              <ShareGraph/>
            </Row>
          </Container>   
         </Fragment> 
    )
})

export default CloudDashBoard
