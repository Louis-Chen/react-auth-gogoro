import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

// import { BehaviorSubject } from 'rxjs'
// import { switchMap } from 'rxjs/operators'
// import { createEpicMiddleware } from 'redux-observable'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import { createFirestoreInstance } from 'redux-firestore' // <- needed if using firestore

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import 'firebase/functions' // <- needed if using httpsCallable

import reducer from './reducers'

/**
 * react-redux-firebase
 */

const firebaseConfig = {
	apiKey: 'AIzaSyAkdvJpmaNSRVqu35dqpgqcEHVso3OilEc',
	authDomain: 'auth-e36aa.firebaseapp.com',
	databaseURL: 'https://auth-e36aa.firebaseio.com',
	projectId: 'auth-e36aa',
	storageBucket: 'auth-e36aa.appspot.com',
	messagingSenderId: '289566316538'
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export const firedatabase = firebase.database()
/**
 * redux-persist
 */

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['gogoro']
}

const persistedReducer = root => persistReducer(persistConfig, root)

/**
 * config
 */

export const history = createBrowserHistory()

const initialState = {}
const enhancers = []
const middleware = [routerMiddleware(history), thunk]

const rootReducer = persistedReducer(reducer(history))

if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

	// middleware.push(createLogger())
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension())
	}
	if (module.hot) {
		module.hot.accept('./reducers', () => {
			store.replaceReducer(reducer(history))
		})
	}
} else if (process.env.NODE_ENV === 'production') {
	console.log(process.env.NODE_ENV)
}

const composeEnhancer = compose(
	applyMiddleware(...middleware),
	...enhancers
)

export const store = createStore(rootReducer, initialState, composeEnhancer)
export const persistor = persistStore(store)

export const reduxfirebaseProps = {
	firebase,
	config: {
		userProfile: 'users',
		useFirestoreForProfile: true,
		useFirestoreForStorageMeta: true,
		fileMetadataFactory: (uploadRes, firebase, metadata, downloadURL) => {
			// upload response from Firebase's storage upload
			const {
				metadata: { name, fullPath }
			} = uploadRes
			// default factory includes name, fullPath, downloadURL
			return {
				name,
				fullPath,
				downloadURL
			}
		}
	},
	dispatch: store.dispatch,
	firebaseStateName: 'firebase',
	createFirestoreInstance // <- needed if using firestore
}
