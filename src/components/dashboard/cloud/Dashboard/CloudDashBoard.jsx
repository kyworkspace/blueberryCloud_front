import React, { Fragment, memo } from 'react'
import Breadcrumb from '../../../../layout/breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap';

const CloudDashBoard = memo(() =>{
    return (
        <Fragment>
         <Breadcrumb parent="Cloud" title="CLOUD PLAN"/>
          <Container fluid={true}>
            <Row>
              <Col sm="6">
                <Card>
                  <CardHeader>
                    <h5>사용 챠트</h5><span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
                  </CardHeader>
                  <CardBody>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>   
         </Fragment> 
    )
})

export default CloudDashBoard
