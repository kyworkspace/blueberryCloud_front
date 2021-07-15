import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { errorMessage } from '../../../../utils/alertMethod'
import { getUserMediaList } from '../../../../utils/commonMethod'
import UserPhotos from './UserPhotos'

const UserMediaList=(props) =>{
    const {id} = props
    
    const [mediaList, setMediaList] = useState([]);
    const [mediaHasMore, setMediaHasMore] = useState(true);
    const skipRef = useRef(0);
    const limitRef = useRef(12);

    useEffect(() => {
        setMediaHasMore(true);
        getUserMediaListInit(id);
    }, [id])

    const getUserMediaListInit=(id)=>{
      skipRef.current = 0
      const body ={
        userId:id,
        skip : 0,
        limit : limitRef.current
      }
      getUserMediaList(body)
      .then(list=>{
        setMediaList(list);
        if(list.length < skipRef.current + limitRef.current){
          setMediaHasMore(false)
        }
        skipRef.current = skipRef.current + limitRef.current;
      })
      .catch(err=>{
        errorMessage("회원 사진 정보를 불러오는데 오류가 발생하였습니다.")
      })
    }

    const getUserMediaHandler =(id)=>{
        const body ={
          userId:id,
          skip : skipRef.current,
          limit : limitRef.current
        }
        getUserMediaList(body)
        .then(list=>{
          setMediaList([...mediaList,...list]);
          if([...mediaList,...list].length < skipRef.current + limitRef.current){
            setMediaHasMore(false)
          }
          skipRef.current = skipRef.current + limitRef.current;
        })
        .catch(err=>{
          errorMessage("회원 사진 정보를 불러오는데 오류가 발생하였습니다.")
        })
      }
    return (
        <Row >
            <Col sm="12">
                <Card>
                    <CardHeader>
                        <h5>{'회원 자료'}</h5>
                    </CardHeader>
                    <CardBody className="my-gallery row gallery-with-description">
                      
                    {mediaList.map((item,idx)=>(
                      <UserPhotos item={item}/>
                    ))}
                    <Row style={{width:'100%'}}>
                        <Col xs={12} style={{display:'grid', justifyContent:'center'}}>
                          {
                            mediaHasMore ? 
                            <a href={'javascript:void(0)'} onClick={()=>getUserMediaHandler(id)}>더보기</a>
                            :
                            <a href={'javascript:void(0)'} >모든 목록을 불러왔습니다.</a>
                          }
                          
                        </Col>
                      </Row>
                    </CardBody>
                </Card>
                
            </Col>
          </Row>
    )
}

export default UserMediaList
