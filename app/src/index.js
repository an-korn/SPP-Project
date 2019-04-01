import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Router } from 'src/routes'

import { configureStore } from 'src/collections/store'
import * as serviceWorker from './serviceWorker'

import 'normalize.css'

const store = configureStore()

ReactDOM.render(
  pug`Provider(store=store): Router`,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
