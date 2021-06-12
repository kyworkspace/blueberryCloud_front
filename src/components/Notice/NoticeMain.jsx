import React, { Fragment, memo, useEffect, useState } from 'react'
import {Button, Container, Row } from 'reactstrap'
import NoticeCard from './NoticeCard'
import Breadcrumb from '../../layout/breadcrumb'
import { useSelector } from 'react-redux'
import { Space } from 'antd'

const NoticeMain= memo(()=> {

    const [noticeAddModal, setNoticeAddModal] = useState(false);
    const [admin, setAdmin] = useState(false)
    const user = useSelector(state => state.user);

    useEffect(() => {
        if(user.userData){
            if(user.userData.isAdmin){
                setAdmin(user.userData.isAdmin)
            }
        }
    }, [user])

    return (
        <Fragment>
         <Breadcrumb parent="Support" title={<>공지사항</>}/>

         {admin &&
            <div className="m-b-15" style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <Button color="primary" style={{marginRight:'2%'}} onClick={()=>setNoticeAddModal(true)}> 공지사항 업로드 </Button>
            </div>
          }
          <Container fluid={true}>
            <NoticeCard/>
          </Container>   
         </Fragment> 
    )
})

export default NoticeMain
