import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Personal from '../components/personal'
import Auth from '../components/auth'
import Reset from '../components/reset'
import Registation from '../components/registration'
import ResetStep2 from '../components/resetStep2'
import NotFound from '../components/404'

import Startup from './startup'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.token)
  const func = (props) => {
    if (!!user && !!user.name && !!token) <Redirect to={{ pathname: '/' }} />
    return <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const tokenResetPassword = useSelector((state) => state.reset.token_reset_success_password)
  const token = useSelector((state) => state.login.token)

  const func = (props) => {
    if (token || tokenResetPassword) return <Component {...props} />

    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  }
  return <Route {...rest} render={func} />
}

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <Route exact path="/login" component={Auth} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/reset/step2" component={ResetStep2} />
            <Route exact path="/registration" component={Registation} />
            <PrivateRoute exact path="/personal" component={Personal} />
            <PrivateRoute exact path="/hidden-route" component={Auth} />
            <OnlyAnonymousRoute exact path="/anonymous-route" component={Auth} />

            <Route component={NotFound} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
