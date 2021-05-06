import React, { memo, useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Clock } from 'react-feather'
import { CardBody } from 'reactstrap'

const Status=memo((props) => {
    
  const [daytimes,setDayTimes] = useState()
  const today = new Date()
  const curHr = today.getHours()
  const curMi = today.getMinutes()
  const [meridiem,setMeridiem] = useState("AM")
  //프로필 배경
  const [profileBackground, setProfileBackground] = useState(null)
  // 프로필 사진
  const [profileAvatar, setProfileAvatar] = useState(null);
  // 프로필 인사말
  const [profileGreetings, setProfileGreetings] = useState(null);

  // eslint-disable-next-line
  const [date, setDate] = useState({ date: new Date() });
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {

    if (curHr < 12) {
        setDayTimes('Good Morning')
      }else if (curHr < 18) {
        setDayTimes('Good Afternoon')
      }else {
        setDayTimes('Good Evening')
      }
  
      if(curHr >= 12){
       setMeridiem('PM')
      }else{
        setMeridiem('AM')
      }

  }, [])


    return (
        <Col xl="4 xl-50" lg="12" className="morning-sec box-col-12">
            {/* 배경이미지는 Card backgroundImage로 조정 , 있을때는 표현 없을때는 lorem picsum */}
            <Card className="o-hidden profile-greeting" style={{backgroundImage:`${profileBackground ? 'url(https://picsum.photos/id/237/467/480)' : 'url(https://picsum.photos/467/480?grayscale)'}`}}>
                <CardBody>
                    <div className="media">
                            {/* 시계 */}
                        <div className="badge-groups w-100">
                            <div className="badge f-12">
                            <Clock style={{width:"16px" ,height:"16px"}} className="mr-1"/>
                            <span id="txt">{curHr}:{curMi < 10 ? "0"+curMi :curMi} {meridiem}</span>
                            </div>
                            <div className="badge f-12"><i className="fa fa-spin fa-cog f-14"></i></div>
                        </div>

                        </div>
                        <div className="greeting-user text-center">
                            {/* 섹터 중앙 프로필 아바타 */}
                        <div className="profile-vector" >
                          {
                            profileAvatar ?
                            <img className="img-fluid" src={'https://picsum.photos/100/100'} alt="메인 화면 아바타" style={{width:'100px', height:'100px',borderRadius:'30px'}}/>
                            :
                            <img className="img-fluid" src={'https://picsum.photos/100/100'} alt="메인 화면 아바타" style={{width:'100px', height:'100px',borderRadius:'30px'}}/>
                          }
                            
                        </div>
                        <h4 className="f-w-600"><span id="greeting">{daytimes}</span> <span className="right-circle"><i className="fa fa-check-circle f-14 middle"></i></span></h4>

                        <p>
                          {
                            profileGreetings ?
                            profileGreetings
                            :
                            <span>BlueBerry Cloud에 어서오세요.<br/>본인의 추억을 저장해보세요</span>
                          }
                        </p>
                        
                        <div className="whatsnew-btn"><a className="btn btn-primary" href="#javascript">파일 보러가기</a></div>
                        {/* 왼쪽하단 종 */}
                        <div className="left-icon"><i className="fa fa-bell"> </i></div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
})

export default Status
