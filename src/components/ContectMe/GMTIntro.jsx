import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'

function GMTIntro() {

    const [VerticleTab, setVerticleTab] = useState('1');
    return (
        <Col sm="12" xl="6 xl-100 box-col-12">
            <Card>
                <CardHeader>
                    <h5>GMT (2019.08~2021.04)</h5>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col sm="3" xs="12">
                            <Nav className="nav flex-column nav-pills">
                                <NavItem>
                                    <NavLink href="#javascript" className={VerticleTab === '1' ? 'active' : ''} onClick={() => setVerticleTab('1')}>해양쓰레기 관리 시스템</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#javascript" className={VerticleTab === '2' ? 'active' : ''} onClick={() => setVerticleTab('2')}>파력 발전 시험장 챠트</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#javascript" className={VerticleTab === '3' ? 'active' : ''} onClick={() => setVerticleTab('3')}>오염방제 관제 시스템</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#javascript" className={VerticleTab === '4' ? 'active' : ''} onClick={() => setVerticleTab('4')}>해양네비게이션 프로그램</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#javascript" className={VerticleTab === '5' ? 'active' : ''} onClick={() => setVerticleTab('5')}>골재채취선 관제 시스템</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#javascript" className={VerticleTab === '6' ? 'active' : ''} onClick={() => setVerticleTab('6')}>전자조업 감시시스템</NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm="9" xs="12">
                            <TabContent activeTab={VerticleTab}>
                            <TabPane className="fade show" tabId="1">
                                <p>
                                    해양쓰레기 관리 시스템    
                                </p>
                            </TabPane>
                            <TabPane className="fade show" tabId="2">
                                <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}</p>
                            </TabPane>
                            <TabPane className="fade show" tabId="3">
                                <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}</p>
                            </TabPane>
                            <TabPane className="fade show" tabId="4">
                                <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}</p>
                            </TabPane>
                            <TabPane className="fade show" tabId="5">
                                <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}</p>
                            </TabPane>
                            <TabPane className="fade show" tabId="6">
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

export default GMTIntro
