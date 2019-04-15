import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import { gogoroReducer } from '../store/fetchGogoroAPI'

export default history =>
	combineReducers({
		router: connectRouter(history),
		firebase: firebaseReducer,
		firestore: firestoreReducer,
		gogoro: gogoroReducer
	})
