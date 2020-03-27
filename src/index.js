import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware,compose} from 'redux'
import {Provider} from "react-redux"
import thunk from 'redux-thunk'

import App from './App'
import userReducer from './reducers'

const persistedState=()=>{
    let prevState=window.localStorage.getItem('previousState')
    if(prevState) return JSON.parse(prevState)
    return {user:null}
}
const store=createStore(userReducer,
            persistedState(),compose(
            applyMiddleware(thunk),
            window.window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()))
function AppWithRedux(){
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

store.subscribe(()=>{window.localStorage.setItem("previousState",JSON.stringify(store.getState()))}) 

ReactDOM.render(<AppWithRedux />, document.getElementById('root'));