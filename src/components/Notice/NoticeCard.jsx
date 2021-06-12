import React from 'react'
import { Card, CardHeader, Col, Row } from 'reactstrap'

function NoticeCard() {
    return (
        <Row>
            <Col sm="12">
            <Card>
                <CardHeader>
                <h5>0.0.1 알파 테스츠</h5><span>{"lorem ipsum dolor sit amet, consectetur adipisicing elit"}</span>
                </CardHeader>
                {/* <CardBody>
                <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
                </CardBody> */}
            </Card>
            </Col>
        </Row>
    )
}

export default NoticeCard
