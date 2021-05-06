import React, { memo } from 'react'
import { Card } from 'react-bootstrap'
import { CardBody, CardHeader, Col, Row } from 'reactstrap'
import Chart from 'react-apexcharts'
import { progress1, progress2, progress3, progress4, progress5 } from './chartsData/charts-data'
import { ShoppingBag } from 'react-feather'

const ShareGraph=memo(() =>{
    return (
        <Col xl="24" lg="12" className="box-col-6 xl-50">
            <Card>
                <CardHeader>
                <Row>
                    <Col xs="9">
                    <h5>OrderStatus</h5>
                    </Col>
                    <Col xs="3" className="text-right"><ShoppingBag className="text-muted" /></Col>
                </Row>
                </CardHeader>
                <CardBody>
                <div className="chart-container">
                    <div id="progress1">
                    <Chart options={progress1.options} series={progress1.series} height="70" type="bar" />                  
                    </div>
                    <div id="progress2">
                    <Chart options={progress2.options} series={progress2.series} height="70" type="bar" /> 
                    </div>
                    <div id="progress3">
                    <Chart options={progress3.options} series={progress3.series} height="70" type="bar" /> 
                    </div>
                    <div id="progress4">
                    <Chart options={progress4.options} series={progress4.series} height="70" type="bar" /> 
                    </div>
                    <div id="progress5">
                    <Chart options={progress5.options} series={progress5.series} height="70" type="bar" /> 
                    </div>
                </div>
                </CardBody>
            </Card>
            </Col>
    )
})

export default ShareGraph
