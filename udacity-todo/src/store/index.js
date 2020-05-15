import reducer from '../reducers';
import middleware from '../middleware';
import { createStore } from 'redux';

export default createStore(reducer, middleware);
