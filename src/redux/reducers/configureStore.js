import firebase from 'firebase/app'
import { createStore, applyMiddleware ,compose } from "redux"
import rootReducer from "./index"
import thunk from "redux-thunk"
import {reduxFirestore,getFirestore } from 'redux-firestore'
import {getFirebase } from 'react-redux-firebase'
import fbConfig from '../../config/FbConfig'

export default function configureStore() {
    return createStore(rootReducer,
        compose(
            applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
            reduxFirestore(firebase, fbConfig),
            
        )
    );
}
