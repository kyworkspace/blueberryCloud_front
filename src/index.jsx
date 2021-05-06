import React, { Fragment,useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import {routes} from './route';
import ConfigDB from './data/customizer/config'
import Auth from './hoc/auth'
//Login-page
import LoginPage from './components/Login/login';
import RegisterPage from './components/Login/register';

//cloud
import CloudDashBoard from './components/cloud/Dashboard/CloudDashBoard';
import CloudViewer from './components/cloud/Board/CloudViewer';

//sns
import SNSTimeline from './components/SNS/index';
import UserInformation from './components/Account/UserInfomation./UserInformation';


const Root = (props) =>  {

  const [anim, setAnim] = useState("");
  const animation = localStorage.getItem("animation") || ConfigDB.data.router_animation || 'fade'
  const abortController = new AbortController();

  useEffect(() => {
      setAnim(animation)
      console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
      console.disableYellowBox = true;
      return function cleanup() {
          abortController.abort();
        }
      // eslint-disable-next-line
    }, []);

    return(
      <Fragment>
        <Provider store={store}>
        <BrowserRouter basename={`/`}>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/user/login`} component={Auth(LoginPage,false)}/>
          <Route exact path={`${process.env.PUBLIC_URL}/user/register`} component={Auth(RegisterPage,false)}/>
          <App>
            <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                return (<Redirect to={`${process.env.PUBLIC_URL}/cloud/dashboard`} />)
            }} />
          <TransitionGroup>
          <Route  exact   path={`${process.env.PUBLIC_URL}/cloud/dashboard`} component={Auth(CloudDashBoard,null)}/>
          <Route  exact   path={`${process.env.PUBLIC_URL}/cloud/viewer/:theme`} component={Auth(CloudViewer,true)}/>
          <Route  exact   path={`${process.env.PUBLIC_URL}/sns/timeline`} component={Auth(SNSTimeline,true)}/>
          <Route  exact   path={`${process.env.PUBLIC_URL}/sns/userinfo`} component={Auth(UserInformation,true)}/>
            {/* {routes.map(({ path, Component }) => (
                <Route key={path} exact   path={`${process.env.PUBLIC_URL}${path}`}>
                    {({ match }) => (
                        <CSSTransition 
                        in={match != null}
                        timeout={100}
                        classNames={anim} 
                        unmountOnExit
                        >
                        <Component {...props}/>
                        </CSSTransition> 
                    )}
                </Route>
                ))} */}
          </TransitionGroup>
          </App>
        </Switch>
        </BrowserRouter>
        </Provider>
      </Fragment>
      )
}
ReactDOM.render(<Root/>,
  document.getElementById('root')
);

serviceWorker.unregister();
