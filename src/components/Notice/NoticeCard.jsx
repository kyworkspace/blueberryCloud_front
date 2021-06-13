import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Card, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import { setNoticeDetailModal } from '../../redux/notice/_actions/notice_actions';
import { confirmMessage} from '../../utils/alertMethod';

function NoticeCard(props) {
    const {notice,admin,listHandler,edit,deleteHandler } = props;
    const dispatch = useDispatch();

    const NoticeSelect=()=>{
        const body = {
            id : notice._id,
            title : notice.title,
            subTitle : notice.subTitle,
            contents : notice.contents,
            show : true
        }
        dispatch(setNoticeDetailModal(body));
    }
    const onDeleteNotice=(e)=>{
        e.stopPropagation();
        confirmMessage('공지사항을 삭제하시겠습니까?','실행','취소',()=>{
            deleteHandler(notice);
        });
    }
    const onEditNotice=()=>{
        edit(notice);
    }
    return (
        <Row >
            <Col sm="12" >
            <Card   >
                <CardHeader onClick={NoticeSelect} style={{cursor:'pointer'}}>
                <h5>{notice.title}</h5><span>{notice.subTitle}</span>
                </CardHeader>
                {
                    admin && 
                    <CardFooter>
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                            <Button color="info" onClick={onEditNotice}>수정</Button>
                            <div style={{marginLeft:'1%',marginRight:'1%'}}/>
                            <Button color="danger" onClick={onDeleteNotice}>삭제</Button>
                        </div>
                        
                    </CardFooter>
                }
                
            </Card>
            </Col>
        </Row>
    )
}

export default NoticeCard
