import React,{useRef, useState} from 'react';
import {Container,Row,Col,Form,FormGroup,Input,Label,Button} from 'reactstrap'
import {SignIn, CreateAccount, PrivacyPolicy} from '../../constant';
import { Twitter, Facebook,GitHub } from 'react-feather';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/user/_actions/user_actions';
import moment from "moment";
import { errorMessage, infoMessage } from '../../utils/alertMethod';
import { Space } from 'antd';
import { sendAuthCheckMail, sendValidCheckMail, userEmailDuplicateCheck } from '../../utils/commonMethod';
import {Button as AntButton} from 'antd'
const backgroundImageList =[
  "basicBackground/basicImage1.jpg"
  ,"basicBackground/basicImage2.jpg"
  ,"basicBackground/basicImage3.jpg"
  ,"basicBackground/basicImage4.jpg"
  ,"basicBackground/basicImage5.jpg"
  ,"basicBackground/basicImage6.jpg"
  ,"basicBackground/basicImage7.jpg"
  ,"basicBackground/basicImage8.jpg"
  ,"basicBackground/basicImage9.jpg"
  ,"basicBackground/basicImage10.jpg"
  ,"basicBackground/basicImage11.jpg"
  ,"basicBackground/basicImage12.jpg"
]


const Register = (props) => {

    const dispatch = useDispatch();
    const [togglePassword,setTogglePassword] = useState(false)
    const [password,setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("");
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [validCheck, setValidCheck] = useState(false);
    const [authInput, setAuthInput] = useState(false);
    const [authValue, setAuthValue] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const authNumberRef = useRef();

    const onEmailHandler =(e)=>{
      setEmail(e.currentTarget.value)
    }

    const onNameHandler =(e)=>{
      setName(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
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
    const onPasswordCheckHandler = (e) => {
      setPasswordCheck(e.target.value)
    }
    const HideShowPassword  = (tPassword) => {
      setTogglePassword(!tPassword)
    }

    const onRegisterHandler =(e)=>{
      e.preventDefault();
      if(!validCheck){
        infoMessage("이메일 인증 확인이 필요합니다.");
        return;
      }
      if(password !== passwordCheck){
        infoMessage("비밀번호를 확인해주세요")
        return;
      }
      let body = {
        email: Email,
        password: password,
        name: Name,
        backgroundImage : backgroundImageList[Math.floor(Math.random()*backgroundImageList.length)],
        profileImage : 'basicBackground/emptyProfile.png'
      }
      dispatch(registerUser(body))
      .then(response=>{
        if(response.payload.success){
          alert("계정 생성에 성공했습니다.")
          props.history.push("/user/login")
        }else{
          alert("아이디 생성에 실패했습니다. 다시 시도해주세요")
        }
      })
    }

    const onEmailcheck=()=>{
      if(Email===""){
        infoMessage("이메일을 입력해주세요");
        return;
      }
      let body ={
        email: Email,
      }
      userEmailDuplicateCheck(body)
      .then(available=>{
        if(available){
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
          //이미 가입된 아이디
          infoMessage("이미 가입된 이메일 주소 입니다.")
        }
      })
      .catch(err=>{
        errorMessage("오류가 발생하였습니다.")
      })
    }
    const onAuthCheck =()=>{
      if(Number(authValue) !== authNumberRef.current){
        infoMessage("인증번호가 다릅니다. 다시 시도해주세요");
        setAuthInput(false);
        setAuthValue(0);
      }else{
        infoMessage("인증 되었습니다.")
        setValidCheck(true);
        setAuthInput(false);
      }
    }

    return (
      <Container fluid={true} className="p-0">
      <Row>
        <Col xs="12">     
          <div className="login-card">
            <div>
              <div className="login-main"> 
                <Form className="theme-form">
                  <h4>{"Create your account"}</h4>
                  <p>{"Bluberry Cloud를 위한 아이디를 생성해주세요"}</p>
                  <FormGroup>
                    <Label className="col-form-label pt-0">성명</Label>
                    <Input className="form-control" type="text" required="" placeholder="Name" value={Name} onChange={onNameHandler}/>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label pt-0">이메일 주소</Label>
                    <Input className="form-control" type="email" required="" placeholder="이메일 입력" value={Email} onChange={onEmailHandler} disabled={validCheck}/>
                    {
                      !validCheck && <Button className="btn-block" color="primary" style={{marginTop:'1%'}} onClick={onEmailcheck}>이메일 인증 키 전송</Button>
                    }
                  </FormGroup>
                  {authInput &&
                  <FormGroup>
                    <Space>
                      <Input className="form-control" type="text" style={{marginTop:'1%'}} required="" placeholder="인증 번호 입력" value={authValue} onChange={(e)=>setAuthValue(e.currentTarget.value)}/>
                      <AntButton size="middle" danger type="default" onClick={onAuthCheck}>확인</AntButton>
                    </Space>
                  </FormGroup>
                  }
                  <FormGroup>
                    <Label className="col-form-label">비밀번호</Label>
                    <Input className="form-control" type={togglePassword ?  "text" : "password" } name="login[password]" value={password} onChange={(e) => onPasswordHandler(e)} required="" placeholder="*********"/>
                    <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                    {passwordError && <div style={{color:'red'}}>영문자 최소 1개, 숫자 최소 1개를 필요로 합니다(최소 8자)</div>}
                    <Label className="col-form-label">비밀번호 재확인</Label>
                    <Input className="form-control" type="password" name="login[password]" value={passwordCheck} onChange={(e) => onPasswordCheckHandler(e)} required="" placeholder="*********"/>
                  </FormGroup>
                  <div className="form-group mb-0">
                    <div className="checkbox ml-3">
                      <Input id="checkbox1" type="checkbox"/>
                      <Label className="text-muted" for="checkbox1">{"Agree with"}<a className="ml-2" href="#javascript">Privacy Policy</a></Label>
                    </div>
                    <Button color="primary" className="btn-block" onClick={onRegisterHandler} disabled={!validCheck||passwordError}>Create Account</Button>
                  </div>
                  <h6 className="text-muted mt-4 or">{"Or signup with"}</h6>
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
                  <p className="mt-4 mb-0">{"Already have an account?"}<a className="ml-2" href={`${process.env.PUBLIC_URL}/user/login`}>{SignIn}</a></p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      </Container>
    );
}

export default Register;