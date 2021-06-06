import React, { memo, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Button, CardBody, CardHeader, Col, Row } from 'reactstrap'
import Chart from 'react-apexcharts'
import { ShoppingBag } from 'react-feather'
import { Tooltip } from 'antd'
import { errorMessage, infoMessage } from '../../../../../utils/alertMethod'
import { useSelector } from 'react-redux'
import { getInUseSize } from '../../../../../utils/commonMethod'
import { calcUnit, decodeUnit } from '../../../../../utils/fileSizeUnit'

const basicOptions = {
        chart: {
            width: 50,
            height: 70,
            type: "bar",
            stacked: true,
            sparkline: {
                enabled: true
            }
        },
        stroke: {
            width: 0,
        },
        fill: {
            colors: ["#3be288"],
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '30%',
                colors: {
                    backgroundBarColors: ['#f2f2f2']
                }
            },
        },
        title: {
            floating: true,
            offsetX: -10,
            offsetY: 5,
            text: '사용 중인 용량'
        },
        subtitle: {
            floating: true,
            align: 'right',
            offsetY: 0,
            text: '44%',
            style: {
                fontSize: '20px'
            }
        },
        tooltip: {
            enabled: true
        },
        xaxis: {
            categories: ['사용량'],
        },
        yaxis: {
            max: 100
        },
    }

const ShareGraph=memo((props) =>{
    const {cloudSize} = props;
    const user = useSelector(state => state.user);
    const [useSize, setUseSize] = useState(0);
    const [barColor, setBarColor] = useState("");
    const [series, setSeries] = useState([])
    const [option, setOption] = useState(basicOptions);
    useEffect(() => {
        if(cloudSize){
            getInUseSizeHandler();
        }
    }, [cloudSize])

    const onMoveToPlan =()=>{
        infoMessage("기획중입니다. 용량 증량은 관리자에게 문의해주세요");
        return false;
    }
    const getInUseSizeHandler=()=>{
        getInUseSize()
        .then(size=>{
            let setColor = "";
            const percent =  (size/decodeUnit(cloudSize,'GB')*100).toFixed(2) ;
            if(percent > 90){
                //빨강
                setColor = "ff2d2d";
            }else if(percent>70){
                //주황
                setColor = "#ffa700";
            }else if(percent>50){
                //파랑
                setColor = "#002bff";
            }else {
                //녹색
                setColor = "#3be288";
            }
            const newSeries = {name:'비율',data:[percent]}
            const newColor = {
                colors: [setColor],
            }
            const newTitle={
                ...basicOptions.title,
                text: `사용 중인 용량 (${calcUnit(size)} / ${cloudSize} GB)`
            };
            const newSubtitle = {
                ...basicOptions.subtitle,
                text: `${percent}%`
            }
            setSeries([newSeries])
            setOption({
                ...option,
                title : newTitle,
                fill : newColor,
                subtitle : newSubtitle
            })
        })
        .catch(err=>{
            errorMessage("사용 중인 용량을 가져오지 못했습니다.")
        })
    }

    return (
        <Col xl="24" lg="12" className="box-col-6 xl-50">
            <Card>
                <CardHeader>
                <Row>
                    <Col xs="9">
                    <h5>이용 중인 CLOUD PLAN</h5>
                    </Col>
                    <Col xs="3" className="text-right">
                        <Button onClick={onMoveToPlan}>PLAN 변경하기</Button>
                    </Col>
                </Row>
                </CardHeader>
                <CardBody>
                <div className="chart-container">
                    <div id="progress1">
                    <Chart options={option} series={series} height="70" type="bar" />                  
                    </div>
                </div>
                </CardBody>
            </Card>
            </Col>
    )
})

export default ShareGraph
