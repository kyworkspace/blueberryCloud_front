import React,{useState} from 'react';
import {Container,Row,Col,Form,FormGroup,Input,Label,Button} from 'reactstrap'
import {SignIn, CreateAccount, PrivacyPolicy} from '../../constant';
import { Twitter, Facebook,GitHub } from 'react-feather';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/user/_actions/user_actions';
import moment from "moment";

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

    const onEmailHandler =(e)=>{
      setEmail(e.currentTarget.value)
    }

    const onNameHandler =(e)=>{
      setName(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
      setPassword(e.target.value)
    }
    const onPasswordCheckHandler = (e) => {
      setPasswordCheck(e.target.value)
    }
    const HideShowPassword  = (tPassword) => {
      setTogglePassword(!tPassword)
    }

    const onRegisterHandler =(e)=>{
      e.preventDefault();
      if(password !== passwordCheck){
        alert("비밀번호를 확인해주세요")
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
                    <Label className="col-form-label">이메일 주소</Label>
                    <Input className="form-control" type="email" required="" placeholder="Test@gmail.com" value={Email} onChange={onEmailHandler}/>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">비밀번호</Label>
                    <Input className="form-control" type={togglePassword ?  "text" : "password" } name="login[password]" value={password} onChange={(e) => onPasswordHandler(e)} required="" placeholder="*********"/>
                    <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}><span className={togglePassword ? "" : "show"}></span></div>
                    <Label className="col-form-label">비밀번호 재확인</Label>
                    <Input className="form-control" type="password" name="login[password]" value={passwordCheck} onChange={(e) => onPasswordCheckHandler(e)} required="" placeholder="*********"/>
                  </FormGroup>
                  <div className="form-group mb-0">
                    <div className="checkbox ml-3">
                      <Input id="checkbox1" type="checkbox"/>
                      <Label className="text-muted" for="checkbox1">{"Agree with"}<a className="ml-2" href="#javascript">{PrivacyPolicy}</a></Label>
                    </div>
                    <Button color="primary" className="btn-block" onClick={onRegisterHandler}>{CreateAccount}</Button>
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