import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducer from './reducer';

export default createStore(Reducer, applyMiddleware(ReduxThunk));