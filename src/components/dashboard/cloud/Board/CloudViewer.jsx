import React, { Fragment } from 'react'
import BoardNavbar from './BoardNavbar/BoardNavbar'
import Breadcrumb from '../../../../layout/breadcrumb'
import {Container,Row,Col,Card,CardText,CardBody,CardImg,CardSubtitle,CardTitle} from 'reactstrap';

import image from '../../../../assets/images/product/1.png'

const FileList = Array(20).fill({}).map((item,idx)=>{
    item.name = `파일${idx}`;
    item.content = `내용${idx}`
    return item;
})

const renderFileList = FileList.map((item,idx)=>(
            <Col xs="4" sm="3"  md="2" >
                <Card>
                    <CardImg top width="100%" src={image} alt="Card image cap" />
                    <CardBody>
                    <CardTitle tag="h5">{item.name}</CardTitle>
                    {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
                    <CardText>2021-03-21</CardText>
                    </CardBody>
                </Card>
              </Col>
))


function CloudViewer() {
    return (
        <Fragment>
         <Breadcrumb parent="Cloud" title="모든 파일"/>
         <BoardNavbar/>
          <Container fluid={true}>
            <Row>
                {renderFileList}
            </Row>
          </Container>   
         </Fragment> 
    )
}

export default CloudViewer
