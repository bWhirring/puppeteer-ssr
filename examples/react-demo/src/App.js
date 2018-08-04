import React from 'react'
import CSSModules from 'react-css-modules'
import { Route, BrowserRouter as Router, Switch, HashRouter, Link } from 'react-router-dom';
import { router } from './routers'
import style from './App.less'
@CSSModules(style)
export default class App extends React.PureComponent {
  render() {
    return (
      <HashRouter>
        <div>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/login">login</Link></li>
          </ul>
          <Switch>
            {router.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact
                component={route.main}
              />
            ))}
          </Switch>
        </div>
      </HashRouter>
    )
  }
}
