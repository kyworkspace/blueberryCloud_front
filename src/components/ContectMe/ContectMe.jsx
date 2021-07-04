import React, { memo, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Media, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import Breadcrumb from '../../layout/breadcrumb'
import BluberryIntro from './BluberryIntro';
import DevelopIntro from './DevelopIntro';
import GMTIntro from './GMTIntro';
import TheHRDerIntro from './TheHRDerIntro';
const ContectMe=memo(() =>{

    return (
        <Container fluid={true}>
            <Breadcrumb parent="Support" title={"개발자 정보"}/>
            <div className="user-profile">
             <Row>
                <Col sm="12">
                    <Card>
                        <div className="profile-img-style">
                            <Row>
                                <Col sm="8">
                                    <div className="media-body align-self-center">
                                    <h4 className="mt-0 user-name">인 사 말</h4>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col lg="12" xl="4">
                                    <div id="aniimated-thumbnials-3"><a href="#javascript"><Media body className="img-fluid rounded" src={require('../../assets/images/profile.jpg')} alt="gallery" /></a></div>
                                </Col>
                                <Col xl="6">
                                <p>
                                    안녕하세요. 블루베리 클라우드 개발자 겸 관리자 박기영입니다.
                                    <br/>
                                    사족에 앞서 먼저 이곳이 이용해 주시고, 또 찾아와 주신 모든 분들께 감사드립니다.
                                    <br/>
                                    본 클라우드의 주 목표이자 목적은 간단한 공유 파일 저장소를 만들고자 하였습니다. 여행간 사진들 혹은 추억속의 사진들을 더 이상 현상하지 않는 시대가 되면서, 사진한장 한장이
                                    디지털 데이터가 되어가면서 열심히 촬영하였지만, 혹은 파일을 만들었지만, 어디 있는지 잊어버리는 일이 많았기 때문에 많은 사람들이 이용하는 SNS 기능을 접목하여 사용자들의 접근성을
                                    높이고자 하였습니다. 
                                    <br/>
                                    2019년 부터 개발자로서의 길을 걷기 시작하면서 "한번쯤 만들어봐야지" 라고 마음을 먹고 난뒤 여러 시도를 하다가 React를 접하게 되면서 
                                    <br/>
                                    <p style={{fontWeight:'bold'}}>express,mongodb, React</p>
                                    로 구성된 본 프로젝트를 2021년 4월 부터 시작하였고, 6월 초에 테스트를 시작하였습니다.
                                    기본 기능을 탑재하고 난뒤 시간적 여유가 되면 많은 테스터 분들께 피드백을 받고 오류 수정 및 기능 개선을 거듭하고 있습니다.
                                    최고의 사이트로 가기엔 갈길이 멀지만 언제나 최선을 다하는 개발자가 되겠습니다.
                                    <br/>
                                    감사합니다.
                                </p>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col sm="12">
                    <Card>
                        <div className="profile-img-style">
                            <Row>
                                <Col sm="8">
                                    <div className="media-body align-self-center">
                                    <h4 className="mt-0 user-name">경력 & 스택</h4>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col xl="12">
                                <Row>
                                    <Col xl="4">
                                        
                                        <div style={{width:'100%', display:'grid', justifyContent:'center'}}>
                                        Career
                                        </div>
                                        <div style={{width:'100%', display:'grid', justifyContent:'center'}}>
                                        <hr/>
                                            <div style={{display:'flex', justifyContent:'space-between', width:'15rem', margin:'1rem'}}>
                                                <div>TheHRDer</div>
                                                <div>2021.04~</div>
                                            </div>
                                            <div style={{display:'flex', justifyContent:'space-between', width:'15rem', margin:'1rem'}}>
                                                <div>GMT</div>
                                                <div>2019.08~2021.04</div>
                                            </div>
                                            <div style={{display:'flex', justifyContent:'space-between', width:'15rem', margin:'1rem'}}>
                                                <div>디벨롭퍼스트</div>
                                                <div>2019.04~2019.07</div>
                                            </div>
                                            
                                        </div>
                                        
                                    </Col>
                                    <Col xl="4">
                                        <div style={{width:'100%', display:'grid', justifyContent:'center'}}>
                                        Stack
                                        </div>
                                        <hr/>
                                        <Row >
                                            <Col xs={3}>
                                                {/* <img src={require('../../assets/images/java.png')} style={{width:'5rem', height:'5rem'}}/> */}
                                                JAVA
                                            </Col>
                                            <Col xs={3}>
                                                SpringFramework
                                            </Col>
                                            <Col xs={3}>
                                                Springboot
                                            </Col>
                                            <Col xs={3}>
                                                Javascript
                                            </Col>
                                            <Col xs={3}>
                                                ReactJS
                                            </Col>
                                            <Col xs={3}>
                                                NodeJS
                                            </Col>
                                            <Col xs={3}>
                                                express
                                            </Col>
                                            <Col xs={3}>
                                                JQeury
                                            </Col>
                                            <Col xs={3}>
                                                sass
                                            </Col>
                                            <Col xs={3}>
                                                openlayers
                                            </Col>
                                            
                                            <Col xs={3}>
                                                Oracle
                                            </Col>
                                            <Col xs={3}>
                                                MS-Sql
                                            </Col>
                                            <Col xs={3}>
                                                postgres
                                            </Col>
                                            
                                        </Row>
                                    </Col>
                                    <Col xl="4">
                                        <div style={{width:'100%', display:'grid', justifyContent:'center'}}>
                                            부가 정보
                                        </div>
                                        <hr/>
                                        <div style={{width:'100%', display:'grid', justifyContent:'center'}}>
                                            <div style={{display:'flex', justifyContent:'space-between', margin:'1rem', width:'100%'}}>
                                                <div>Git Hub</div>
                                                <div><a href="https://github.com/kyworkspace" target="_blank">https://github.com/kyworkspace</a></div>
                                            </div>
                                            <div style={{display:'flex', justifyContent:'space-between', margin:'1rem', width:'100%'}}>
                                                <div>Blog</div>
                                                <div><a href="https://blog.naver.com/ky91zzang" target="_blank">https://blog.naver.com/ky91zzang</a></div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                {/* <Container fluid={true}>
                <div className="page-title">
                    <Row>
                        <Col xs="4">
                            <h3>CAREER</h3>
                        </Col>
                    </Row>
                </div>
                </Container>
                <BluberryIntro/>
                <TheHRDerIntro/>
                <GMTIntro/>
                <DevelopIntro/> */}
            </Row>
        </div>  
    </Container>
    )
})

export default ContectMe
