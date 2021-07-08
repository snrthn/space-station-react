import { createStore, applyMiddleware } from 'redux';
import Reducer from './reducer';

// import ReduxThunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';
import mySagas from './sagas';

let sagaMiddleWare = createSagaMiddleware();

let Store = createStore(Reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(mySagas);

export default Store;