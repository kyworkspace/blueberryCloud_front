import React, { useRef } from 'react';
import {Container,Row,Col,Form,FormGroup,Label,Input,Button} from 'reactstrap' 
// import { NewPassword,RetypePassword,Done,EnterMobileNumber,EnterOTP,Resend,ResetPassword, RememberPassword, SignIn,Send} from "../../../constant";
import { useState } from 'react';
import { sendAuthCheckMail, userEmailDuplicateCheck } from '../../utils/commonMethod';
import { errorMessage, infoMessage } from '../../utils/alertMethod';
import {withRouter} from 'react-router-dom'
import { setPasswordReset, setPasswordUpdate } from '../../redux/user/_actions/user_actions';
import { useDispatch } from 'react-redux';

const Forgetpwd = (props) => {

    const dispatch = useDispatch();
    const [togglePassword,setTogglePassword] = useState(false);
    const [password,setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [Email, setEmail] = useState("");
    const [pwdInput, setPwdInput] = useState(false);
    const [AuthInput, setAuthInput] = useState(false);
    const [authValue, setAuthValue] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const authNumberRef = useRef();

    const handleChange = (e) => {
      let text = e.target.value
      let korCheck = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      text = text.replace(korCheck,"");
      let pwcheck = /^(?=.*[0-9])(?=.*[a-z]).{8,}/;
      let flag = pwcheck.test(text);
      if(!flag){
        setPasswordError(true)
      }else{
        setPasswordError(false)
      }
      setPassword(text)
    }
    const HideShowPassword  = (tPassword) => {
      setTogglePassword(!tPassword)
    }
    const onEmailHandler =(e)=>{
      setEmail(e.currentTarget.value)
    }
    const onPasswordCheckHandler = (e) => {
      setPasswordCheck(e.target.value)
    }
    const onEmailcheck=(e)=>{
      e.preventDefault();
      if(Email===""){
        infoMessage("이메일을 입력해주세요");
        return;
      }
      let body ={
        email: Email,
      }
      userEmailDuplicateCheck(body)
      .then(available=>{
        console.log(available)
        if(!available){
          //인증 번호 보내기
          sendAuthCheckMail(body)
          .then(number=>{
            infoMessage("인증 메일을 전송 하였습니다.");
            authNumberRef.current = number;
            setAuthInput(true);
          }).
          catch(err=>{
            errorMessage("이메일 인증 중 오류가 발생 하였습니다.")
          })
        }else{
          //가입 안된 아이디
          infoMessage("회원 정보가 없습니다.</br>회원가입을 진행해주세요")
        }
      })
      .catch(err=>{
        errorMessage("오류가 발생하였습니다.")
      })
    }
    const onAuthCheck =()=>{
      if(Number(authValue) !== authNumberRef.current){
        infoMessage("인증번호가 다릅니다.<br/>다시 시도해주세요");
        setAuthInput(false);
        setAuthValue(0);
      }else{
        infoMessage("인증 되었습니다.")
        setAuthInput(false);       
        setPwdInput(true);
      }
    }
    const onPasswordChange=(e)=>{
      e.preventDefault();
      if(password !== passwordCheck){
          return infoMessage('입력한 신규 비밀번호가 다릅니다.')
      }
      const body={
          password : password,
          newPassword : passwordCheck
      }
      dispatch(setPasswordReset(body))
      .then(res=>{
          if(res.payload){
              infoMessage(res.payload.message);
              props.history.push('/user/login');
          }
      })
  }

    
    return (
      <Container fluid={true}>
      <Row>
          <Col xs="12">     
            <div className="login-card">
              <div>
                <div><a className="logo" href="#javascript"><img className="img-fluid for-light" src={require("../../assets/images/logo/login.png")} alt="looginpage"/><img className="img-fluid for-dark" src={require("../../assets/images/logo/logo_dark.png")} alt="looginpage"/></a></div>
                <div className="login-main"> 
                  <Form className="theme-form">
                    <h4>비밀번호 변경</h4>
                    <FormGroup>
                      <Label className="col-form-label">이메일을 입력해주세요.</Label>
                      <Row>
                        <Col md="12">
                          <Input className="form-control mb-1" type="email" placeholder="test@gmail.com" onChange={onEmailHandler}/>
                        </Col>
                        <Col xs="12">
                          <Button color="primary" className="btn-block m-t-10" type="submit" onClick={onEmailcheck}>인증번호 보내기</Button>
                        </Col>
                      </Row>
                    </FormGroup>
                    {
                      AuthInput && 
                      <FormGroup>
                        <Label className="col-form-label pt-0">인증 번호 입력</Label>
                        <Row>
                          <Col xs="12">
                            <Input className="form-control text-center opt-text" type="text" onChange={(e)=>setAuthValue(e.currentTarget.value)}/>
                          </Col>
                          <Col xs="12">
                            <Button color="info" className="btn-block m-t-10" type="text" onClick={onAuthCheck}>인증 번호 확인</Button>
                          </Col>
                        </Row>
                      </FormGroup>
                    }
                    
                    {
                      pwdInput &&
                      <>
                        <h6 className="mt-4">새로운 비밀번호를 입력해주세요</h6>
                        <FormGroup>
                          <Label className="col-form-label">신규 비밀번호 입력</Label>
                          <Input className="form-control" type={togglePassword ? "text" : "password" } name="login[password]" value={password} onChange={(e) => handleChange(e)} required="" placeholder="*********"/>
                          <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                          {passwordError && <div style={{color:'red'}}>영문자 최소 1개, 숫자 최소 1개를 필요로 합니다(최소 8자)</div>}
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label">비밀번호 확인</Label>
                          <Input className="form-control" type="password" name="login[password]" required="" placeholder="*********"  value={passwordCheck} onChange={(e) => onPasswordCheckHandler(e)}/>
                        </FormGroup>
                        <FormGroup className="mb-0">
                          <Button color="primary" className="btn-block" type="submit" onClick={onPasswordChange}>비밀번호 변경</Button>
                        </FormGroup>
                      </>
                    }
                    
                    <p className="mt-4 mb-0">{"Already have an password?"}<a className="ml-2" href="javascript:void(0)" onClick={()=>props.history.push('/user/login')}>SignIn</a></p>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
}

export default withRouter(Forgetpwd);