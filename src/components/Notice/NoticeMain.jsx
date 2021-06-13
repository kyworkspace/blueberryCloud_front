import React, { Fragment, memo, useEffect, useState } from 'react'
import {Button, Container, Row } from 'reactstrap'
import NoticeCard from './NoticeCard'
import Breadcrumb from '../../layout/breadcrumb'
import { useSelector } from 'react-redux'
import NoticeUploadModal from './NoticeUploadModal'
import {deleteNotice, getNoticeList, updateNotice, uploadNotice} from '../../utils/commonMethod';
import { errorMessage, successMessage } from '../../utils/alertMethod';
import InfiniteScroll from 'react-infinite-scroll-component';
const NoticeMain= memo(()=> {

    const user = useSelector(state => state.user);
    const [noticeUploadModal, setNoticeUploadModal] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [noticeList, setNoticeList] = useState([]);
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0)
    const [selectedNotice, setSelectedNotice] = useState();
    const [hasMoreItem, setHasMoreItem] = useState(true);
    const [totalCount, setTotalCount] = useState(1000);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.userData){
            if(user.userData.isAdmin){
                setAdmin(user.userData.isAdmin)
            }
        }
    }, [user]);
    useEffect(() => {
        getNoticeListHandler();
    }, [])
    const getNoticeListHandler=(startPoint)=>{
        const body={
            limit,
            skip : String(startPoint) !=='undefined' ? startPoint : skip
        }
        getNoticeList(body)
        .then(list=>{
            console.log(list)
            if(String(startPoint)!=='undefined'){
                setSkip(startPoint)
                setNoticeList(noticeList);
            }else{
                setNoticeList([...noticeList,...list]);
                setSkip(skip+limit)
                if([...noticeList,...list].length < limit + skip){
                    setHasMoreItem(false);
                }
            }
        })
        .catch(err=>{
            errorMessage("공지사항 목록을 불러오는데 실패하였습니다.")
        })

    }
    const uploadNoticeHandler=(body)=>{
         //공지사항 저장
        uploadNotice(body)
        .then(success=>{
            successMessage("공지사항을 등록하였습니다.");
            let newList = [body,...noticeList];
            setNoticeList(newList)
        })
        .catch(err=>{
            errorMessage("공지사항 등록에 실패했습니다.")
        })
    }
    const updateNoticeHandler=(body)=>{
        updateNotice(body)
        .then(result=>{
            successMessage("공지사항을 수정하였습니다.");
            let newList = noticeList.map(item=>{
                if(item._id === body.id){
                    item.title = body.title;
                    item.subTitle = body.subTitle;
                    item.contents = body.contents;
                }
                return item;
            });
            setNoticeList(newList)
            
        })
        .catch(err=>{
            errorMessage("공지사항 수정 중 오류가 발생하였습니다.")
        })
    }
    const deleteNoticeHandler=(notice)=>{
        deleteNotice(notice)
        .then(success=>{
            successMessage('공지사항에 삭제되었습니다.');
            const currentIndex = noticeList.indexOf(notice);
            let newList = [...noticeList]
            newList.splice(currentIndex,1);
            setNoticeList(newList);
        })
        .catch(err=>{
            errorMessage("공시사항 삭제 중 오류가 발생하였습니다.");
        })
    }
    const noticeEditModal=(notice)=>{
        setSelectedNotice(notice)
        setNoticeUploadModal(true);
    }
    return (
        <Fragment>
         <Breadcrumb parent="Support" title={<>공지사항</>}/>

         {admin &&
            <div className="m-b-15" style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <Button color="primary" style={{marginRight:'2%'}} onClick={()=>setNoticeUploadModal(true)}> 공지사항 업로드 </Button>
            </div>
          }
          <Container fluid={true} 
          className="withoutScroll"
          >
            <InfiniteScroll
            dataLength = {noticeList.length}
            next={getNoticeListHandler}
            hasMore={hasMoreItem}
            loader={
                <div style={{width:'100%',display:'grid',justifyContent:'center'}}>
                    <h4>다음 목록을 가져오는 중입니다.</h4>
                </div>
            }
            height={600}
            endMessage={
                <div style={{width:'100%',display:'grid',justifyContent:'center'}}>
                    <b>모든 목록을 불러왔습니다.</b>
                </div>
            }
            style={{maxWidth:'100%'}}
            >
                {
                    noticeList.map(item=>{
                        return <NoticeCard notice={item} key={item._id} admin={admin} listHandler={getNoticeListHandler} edit={noticeEditModal} deleteHandler={deleteNoticeHandler}/>
                    })
                }
            </InfiniteScroll>
          </Container>   
          <NoticeUploadModal 
           isOpen={noticeUploadModal} 
           setModal={setNoticeUploadModal} 
           noticeUpload={uploadNoticeHandler}
           noticeUpdate = {updateNoticeHandler}
           selectedNotice={selectedNotice}
           setSelectedNotice={setSelectedNotice}
           />
         </Fragment> 
    )
})

export default NoticeMain
