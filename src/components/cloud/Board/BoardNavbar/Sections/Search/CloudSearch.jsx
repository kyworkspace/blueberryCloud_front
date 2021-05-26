import { Col, DatePicker, Divider, Row, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { memo, useContext, useState } from 'react'
import { Search } from 'react-feather';
import { useSelector } from 'react-redux';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { infoMessage } from '../../../../../../utils/alertMethod';
import { decodeUnit, judgeUnit } from '../../../../../../utils/fileSizeUnit';
import { CloudBoardContext } from '../../../CloudViewer';
const {RangePicker} = DatePicker;

const CloudSearch=memo((props) =>{

    const folder = useSelector(state => state.folder)
    const {searchContents,setSearchContents} = useContext(CloudBoardContext)
    const {ModalHandler,isOpen} = props;
    const [term, setTerm] = useState(searchContents.searchTerm) //검색어
    const [DateFlag, setDateFlag] = useState(searchContents.startDate ? true:false);//검색기간
    const [startDate, setStartDate] = useState(searchContents.startDate ? new Date(searchContents.startDate):new Date());
    const [endDate, setEndDate] = useState(searchContents.endDate ? new Date(searchContents.endDate) : new Date());
    //형식
    const [typeFlag, setTypeFlag] = useState(searchContents.type ? true:false);
    const [type, setType] = useState(searchContents.type)
    //사이즈
    const [sizeFlag, setSizeFlag] = useState(searchContents.minSize || searchContents.maxSize ? true: false)
    const [minSize, setMinSize] = useState(searchContents.minSize ? searchContents.minSize : 0);
    const [maxSize, setMaxSize] = useState(searchContents.maxSize ? searchContents.maxSize : 0);
    const [minUnit, setMinUnit] = useState(judgeUnit(searchContents.minSize));
    const [maxUnit, setMaxUnit] = useState(judgeUnit(searchContents.maxSize));
    //검색 위치
    const [pathFlag, setPathFlag] = useState(false)
    const [path, setPath] = useState(folder.path)

    const onCloseModal = () => {
        ModalHandler(false)
    };
    const onSearchTermHandler=(e)=>{
        setTerm(e.currentTarget.value);
    }
    const onRangeDatehandler=(moment,date)=>{
        setStartDate(date[0]);
        setEndDate(date[1]);
    }
    const onSearchDatehandler =(e)=>{
        setDateFlag(e.target.checked)
    }
    const onTypeSelect=(value)=>{
        setType(value);
    }
    const onMinUnitChange=(value)=>{
        setMinUnit(value);
    }
    const onMaxUnitChange=(value)=>{
        setMaxUnit(value);
    }
    const onConfirmModal=()=>{
        let body={};

        if(term){
            body.searchTerm = term
        }
        if(DateFlag){
            body.startDate = startDate;
            body.endDate = endDate;
        }
        if(sizeFlag){
            body.minSize = decodeUnit(minSize,minUnit);
            body.maxSize = decodeUnit(maxSize,maxUnit);
        }
        if(typeFlag){
            body.type=type;
        }
        if(pathFlag){
            body.path = path;
        }
         
        if(Object.keys(body).length === 0){
            infoMessage('검색 항목이 없어요')
            return false;
        }
        setSearchContents(body);
        onCloseModal();
    }
    return (
        <Modal isOpen={isOpen} style={{minWidth:'600px', fontFamily:'twayair'}}>
            <ModalHeader toggle={onCloseModal}>파일검색</ModalHeader>
            <ModalBody>
                <Row gutter={[16,25]}>
                    <Col sm={24} md={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                         파일명 검색
                    </Col>
                    <Col sm={24} md={18}>
                        <div className="faq-form">
                            <Input className="form-control" type="text" placeholder="파일명 입력" value={term} onChange={onSearchTermHandler}/>
                            <Search className="search-icon" />
                        </div>
                    </Col>
                    <Col sm={24} md={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Label className="d-block" for="chk-ani">
                            <Input className="checkbox_animated" id="chk-ani" type="checkbox" checked={DateFlag} onChange={onSearchDatehandler}/> 기간 검색
                        </Label>
                    </Col>
                    <Col sm={24} md={18}>
                        <RangePicker size='large' onChange={onRangeDatehandler} disabled={!DateFlag}/>
                    </Col>
                    <Col sm={24} md={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Label className="d-block" for="chk-ani">
                            <Input className="checkbox_animated" id="chk-ani" type="checkbox" checked={sizeFlag} onChange={(e)=>setSizeFlag(e.target.checked)}/> 파일크기
                        </Label>
                    </Col>
                    <Col sm={24} md={18} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Input style={{width:'100px'}} type='number' disabled={!sizeFlag} onChange={(e)=>setMinSize(e.target.value)} value={minSize}/>
                        <Select defaultValue="MB" style={{ width: 120}} onChange={onMinUnitChange} value={minUnit} size='large' disabled={!sizeFlag}>
                            <Option value="KB">KB</Option>
                            <Option value="MB">MB</Option>
                            <Option value="GB">GB</Option>
                        </Select>
                        ~
                        <Input style={{width:'100px'}} type='number' disabled={!sizeFlag} onChange={(e)=>setMaxSize(e.target.value)} value={maxSize}/>
                        <Select defaultValue="MB" style={{ width: 120,height:'100%' }} onChange={onMaxUnitChange} value={maxUnit} size='large' disabled={!sizeFlag}>
                            <Option value="KB">KB</Option>
                            <Option value="MB">MB</Option>
                            <Option value="GB">GB</Option>
                        </Select>
                    </Col>
                    <Col sm={24} md={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Label className="d-block" for="chk-ani">
                            <Input className="checkbox_animated" id="chk-ani" type="checkbox" checked={typeFlag} onChange={(e)=>setTypeFlag(e.target.checked)}/> 파일 형식
                        </Label>
                    </Col>
                    <Col sm={24} md={18}>
                        <Select style={{ width: 120 }} onChange={onTypeSelect} value={type} disabled={!typeFlag}>
                            <Option value="image">그림</Option>
                            <Option value="video">동영상</Option>
                            <Option value="music">음악</Option>
                            <Option value="application">기타</Option>
                        </Select>
                    </Col>
                    <Divider/>
                    {/* <Col sm={24} md={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Label className="d-block" for="chk-ani">
                            <Input className="checkbox_animated" id="chk-ani" type="checkbox" checked={pathFlag} onChange={(e)=>setPathFlag(e.target.checked)}/> 검색 위치
                        </Label>
                    </Col>
                    <Col sm={24} md={18}>
                        <Label className="d-block" for="edo-ani">
                            <Input className="radio_animated" id="edo-ani" type="radio" name="rdo-ani" disabled={!pathFlag}/>전체
                        </Label>
                        <Label className="d-block" for="edo-ani1">
                            <Input className="radio_animated" id="edo-ani1" type="radio" name="rdo-ani" disabled={!pathFlag}/>직접선택
                        </Label>
                        <Input className="form-control" type="text" placeholder="폴더 경로" onChange={(e)=>setPath(e.currentTarget.value)} value={path}/>
                    </Col> */}
                </Row>
                
                
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onConfirmModal}>검색</Button>{' '}
                <Button color="secondary" onClick={onCloseModal}>취소</Button>
            </ModalFooter>
        </Modal>
    )
})

export default CloudSearch
