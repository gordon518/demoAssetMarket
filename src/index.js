import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './css/index.css'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import userReducer from './redux/reducer'

//create store object
//call reducer function to initiate state
const store = createStore(userReducer)
console.log(store);

//pass in store
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

export default store;

