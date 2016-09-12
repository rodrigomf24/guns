// import './../node_modules/bootstrap/dist/css/bootstrap.css'
import './../node_modules/bootstrap/dist/css/bootstrap-theme-sandstone.css'
import './../node_modules/bootstrap/dist/js/bootstrap.js'
import './../node_modules/bootstrap/dist/js/bootstrap.min.js'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { App, Login, Dashboard, Landing } from './components'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultIsVisible={false}>
    <LogMonitor theme='tomorrow' preserveScrollTop={false} />
  </DockMonitor>
)

const store = createStore(
  reducer,
  DevTools.instrument()
)
const history = syncHistoryWithStore(browserHistory, store)

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
)

//<Route path="dashboard" component={Dashboard}/>