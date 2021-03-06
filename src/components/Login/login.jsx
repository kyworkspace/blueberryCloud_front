import React,{useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import {Twitter,Facebook,GitHub} from 'react-feather'
import {Password,EmailAddress,RememberPassword,ForgotPassword ,CreateAccount,LoginWithJWT} from '../../constant';
import axios from 'axios'
import { useDispatch } from 'react-redux';

import {loginUser} from '../../redux/user/_actions/user_actions'

const Logins = (props) => {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("bluberryRememberMe") ? true : false;
  const initialEmail = localStorage.getItem("bluberryRememberMe") ? localStorage.getItem("bluberryRememberMe") : '';

  const [togglePassword,setTogglePassword] = useState(false)

  const [password,setPassword] = useState("")
  const [selected, setSelected] = useState("firebase");
  const [passwordError, setPasswordError] = useState(false);
  const [Email, setEmail] = useState(initialEmail)
  const [RememberMe, setRememberMe] = useState(rememberMeChecked);

  const onEmailChangeHandle=(e)=>{
    setEmail(e.currentTarget.value);
  }
  const handleChange = (e) => {
    let text = e.target.value
    let korCheck = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
    text = text.replace(korCheck,"");
    setPassword(text)
  }
  const HideShowPassword  = (tPassword) => {
    setTogglePassword(!tPassword)
  }
  const onEmailRememberHandler =(e)=>{
    setRememberMe(e.currentTarget.checked);
  }

  const onLoginHandler =(e)=>{
    e.preventDefault();
    setTimeout(() => {
        let body = {
          email : Email,
          password : password
        }

        dispatch(loginUser(body))
        .then(response=>{
          if(response.payload.loginSuccess){
            if (RememberMe === true) {
              window.localStorage.setItem('bluberryRememberMe', Email);
              // console.log(response.payload.token);
              // document.cookie='x_auth='+response.payload.token;
            } else {
              localStorage.removeItem('bluberryRememberMe');
            }
            props.history.push("/"); //=> 대쉬보드 메인으로 감
          }else{
            // alert("Check out your Account or Password again")
            alert(response.payload.message)
            return;
          }
        })
    },500)
  }
  const onPwdSearch=()=>{
    props.history.push("/user/forgetPwd");
  }

  return (
      <Container fluid={true} className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">     
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="#javascript">
                  {/* 로고 위치 */}
                </a>
              </div>
              <div className="login-main login-tab"> 
                    <Form className="theme-form" onSubmit={onLoginHandler}>
                      <h4>{`Sign In  Bluberry Cloud`}</h4>
                      <p>{"Enter your email & password to login"}</p>
                      <p>{"구글 및 카카오 로그인도 언젠가 적용할 예정입니다."}</p>
                      <FormGroup>
                        <Label className="col-form-label">{EmailAddress}</Label>
                        <Input className="form-control" type="email" required="" placeholder="Test@gmail.com" onChange={onEmailChangeHandle} value={Email}/>
                      </FormGroup>
                      <FormGroup>
                        <Label className="col-form-label">{Password}</Label>
                        <Input className="form-control" type={togglePassword ?  "text" : "password" } name="current-password" value={password} onChange={(e) => handleChange(e)} required="" placeholder="비밀번호를 입력해주세요"/>
                        <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                      </FormGroup>
                      <div className="form-group mb-0">
                        {/* 이메일 기억하는 거 */}
                        <div className="checkbox ml-3">
                          <Input id="checkbox1" type="checkbox" onClick={onEmailRememberHandler} checked={RememberMe}/>
                          <Label className="text-muted" for="checkbox1">아이디 기억하기</Label>
                        </div>
                        {/* 비밀번호 찾기 */}
                        <a className="link" href="javascript:void(0)" onClick={onPwdSearch}>비밀번호 찾기</a>
                        {/* 로그인 버튼 */}
                        <Button color="primary" className="btn-block" onClick={onLoginHandler}>Access To Bluberry CLOUD(로그인)</Button>
                      </div>
                      {/* 써드파티 로그인... 구현 예정 */}
                      <h6 className="text-muted mt-4 or">{"Or Sign in with"}</h6>
                      <div className="social mt-4">
                        <div className="btn-showcase">
                          <Button color="light">
                            <Facebook className="txt-fb" />
                          </Button>
                          <Button color="light">
                            <i className="icon-social-google txt-googleplus"></i>
                          </Button>
                          <Button color="light">
                            <Twitter className="txt-twitter" />
                          </Button>
                          <Button color="light">
                            <GitHub />
                          </Button>
                        </div>
                      </div>
                      {/* 회원가입 */}
                      <p className="mt-4 mb-0">계정이 없으신가요?<a className="ml-2" href={`${process.env.PUBLIC_URL}/user/register`}>계정 만들기</a></p>
                    </Form>
              </div>
            </div>
          </div>
        </Col>
        </Row>
      </Container>
  );
}

export default withRouter(Logins);