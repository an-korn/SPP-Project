import {
  BrowserRouter, Route, Link as RouteLink, Redirect as RouteRedirect,
} from 'react-router-dom'

import InitializeSession from 'src/containers/InitializeSession'
import Layout from 'src/components/Layout'

import HomePage from 'src/pages/Home'
import AuthCallbackPage from 'src/pages/AuthCallback'
import Logout from 'src/components/Logout'

const routes = {
  HOME: '/',
  AUTH_LOGIN: `http://localhost:3001/api/v1/authentication`,
  AUTH_CALLBACK: '/authentication',
  AUTH_LOGOUT: '/logout',
}

export function Router() {
  return pug`
    InitializeSession
      BrowserRouter
        Layout
          Route(exact path=routes.HOME component=HomePage)

          Route(exact path=routes.AUTH_CALLBACK component=AuthCallbackPage)

          Route(exact path=routes.AUTH_LOGOUT component=Logout)
  `
}

const getRoute = key =>
  routes[key] || key

export function Link({ to, ...props }) {
  return pug`
    RouteLink(...props to=getRoute(to))
  `
}

export function LinkExternal({ to, ...props }) {
  return pug`
    a(...props href=getRoute(to))
  `
}

export function Redirect({ to, ...props }) {
  return pug`
    RouteRedirect(...props to=getRoute(to))
  `
}
