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
import LoginPage from './components/page/Login/login';
import RegisterPage from './components/page/Login/register';
import CloudDashBoard from './components/dashboard/cloud/Dashboard/CloudDashBoard';
import CloudViewer from './components/dashboard/cloud/Board/CloudViewer';


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
            {/* {routes.map(({ path, Component }) => (
              
              { path:`${process.env.PUBLIC_URL}/cloud/viewer/:theme`, Component:CloudViewer},
                <Route key={path} exact   path={`${process.env.PUBLIC_URL}${path}`}>
                    {({ match,props }) => (
                        <CSSTransition 
                        in={match != null}
                        timeout={100}
                        classNames={anim} 
                        unmountOnExit
                        >
                        <div><Component {...props}/></div>
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
