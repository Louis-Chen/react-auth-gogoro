import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore

export default history =>
	combineReducers({
		router: connectRouter(history),
		firebase: firebaseReducer,
		firestore: firestoreReducer
	})
