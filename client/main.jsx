import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import userState from '/imports/startup/client/reducers/userReducers.js';
import stockState from '/imports/startup/client/reducers/stockReducers.js';

import LogIn from '/imports/ui/LogIn/LogIn.jsx';
import Test from '/imports/ui/Test/Test.jsx';
import App from '/imports/ui/App.jsx';


Meteor.startup(() => {

    const middleware = routerMiddleware(browserHistory);

    const store = createStore(
      combineReducers({
        userState,
        stockState
      }),
      compose(

        applyMiddleware(
          middleware,
          thunkMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension(): f=>f
      )
    )

    render(
      <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
              <IndexRoute component={LogIn}/>
              <Route path="LogIn" component={LogIn}/>
              <Route path="Test" component={Test}/>
            </Route>
        </Router>
      </Provider>
      , document.getElementById('root'));
})
