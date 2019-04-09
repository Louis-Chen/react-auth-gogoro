import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { store, history, reduxfirebaseProps, persistor } from 'config/configureStore'

import App from './App'

import * as serviceWorker from './serviceWorker'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { PersistGate } from 'redux-persist/integration/react'

const render = Component => {
	return ReactDOM.render(
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...reduxfirebaseProps}>
				<PersistGate loading={null} persistor={persistor}>
					<ConnectedRouter history={history}>
						<Component />
					</ConnectedRouter>
				</PersistGate>
			</ReactReduxFirebaseProvider>
		</Provider>,
		document.getElementById('root')
	)
}

render(App)

if (module.hot) {
	module.hot.accept('./app', () => {
		const NextApp = require('./App').default
		render(NextApp)
	})
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
