import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from 'reduxes/reducers';
import ApiMiddleware from 'reduxes/middlewares/ApiMiddleware';

export default function configureStore(history) {
    return createStore(
        rootReducer,
        applyMiddleware(
            thunk,
            ApiMiddleware,
            routerMiddleware(history)
        )
    );
};