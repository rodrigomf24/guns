import './../node_modules/bootstrap/dist/css/bootstrap.css';
import './../node_modules/bootstrap/dist/themes/sandstone.css';
import './../node_modules/material-design-icons/iconfont/material-icons.css';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as reducers from './reducers';
import { App, Login, Dashboard, Landing } from './components';
import { LOGIN, LOGOUT } from './constants';
import { Encrypt, Decrypt } from './encryption';
import Api from './services/SutorejiApi';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultIsVisible={false}>
    <LogMonitor theme='tomorrow' preserveScrollTop={false} />
  </DockMonitor>
);

const proceedWithAction = (action, next) => {
  let result = next(action);
  // We store the user login session store state in sessionStorage, in order to persist the data on page reload
  if(action.type === LOGIN) {
    sessionStorage.setItem('gsession', Encrypt(store.getState().session));
  }
  return result;
};

const myLogger = store => next => action => {
  console.log(action);
  // The following code will recover the user session store, on page reload
  if(action.type.match(/LOCATION\_CHANGE/) !== null) {
    let session = store.getState().session;
    if(session.authToken === void(0) && session.userId === void(0) && sessionStorage.getItem('gsession') !== null) {
        let session = Decrypt(sessionStorage.getItem('gsession'));
        if(typeof(session) === 'object') {
          store.dispatch(Object.assign({}, {
            type: LOGIN,
            payload:{
              status:session.loginStatus,
              token:session.authToken,
              id:session.userId,
              userInfo:session.user
            }
          }));
          if(action.payload.pathname.match(/login/) !== null) {
            browserHistory.push('/dashboard');
          }
        } else {
          return proceedWithAction(action, next);
        }
    } else if(action.payload.pathname.match(/login/) !== null && session.authToken !== void(0) && session.userId !== void(0)) {
      browserHistory.push('/dashboard');
    } else {
      return proceedWithAction(action, next);
    }
  } else {
    return proceedWithAction(action, next);
  }
};

const store = createStore(
  reducer,
  DevTools.instrument(),
  applyMiddleware(myLogger)
);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={Landing}></Route>
        <Route path="/login" component={App}>
          <IndexRoute component={Login}/>
        </Route>
        <Route path="/dashboard" component={App}>
          <IndexRoute component={Dashboard}/>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);

//<Route path="dashboard" component={Dashboard}/>