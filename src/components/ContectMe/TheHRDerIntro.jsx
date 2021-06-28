import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
function TheHRDerIntro() {
    const [thehrderTab, setThehrderTab] = useState('1');
    return (
        <Col sm="12" xl="6 xl-100 box-col-12">
            <Card>
                <CardHeader>
                    <h5>TheHRDer (2021.04)</h5>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col sm="3" xs="12">
                            <Nav className="nav flex-column nav-pills">
                                <NavItem>
                                    <NavLink href="#javascript" className={thehrderTab === '1' ? 'active' : ''} onClick={() => setThehrderTab('1')}>피아노 실습 프로그램</NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm="9" xs="12">
                            <TabContent activeTab={thehrderTab}>
                            <TabPane className="fade show" tabId="1">
                                <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}</p>
                            </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    )
}

export default TheHRDerIntro
