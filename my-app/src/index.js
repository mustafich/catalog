import React from 'react';
import ReactDOM from 'react-dom';
import "./libs/rest/reset.css"
import "./libs/bootstrap-grid/bootstrap-grid.css"
import rootReducer from "./redux/reducer/reducerAll"
import {Provider} from "react-redux";
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";



const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

