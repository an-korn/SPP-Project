import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Router } from 'src/routes'

import { configureStore } from 'src/collections/store'
import * as serviceWorker from './serviceWorker'
import SocketClient from "src/helpers/socket"

import 'normalize.css'

const socketClient = new SocketClient();
const store = configureStore(socketClient)

ReactDOM.render(
  pug`Provider(store=store): Router`,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
socketClient.connect()
