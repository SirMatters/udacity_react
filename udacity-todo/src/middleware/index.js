import { applyMiddlware } from 'react-redux';
import thunk from 'redux-thunk';
import checker from './checker';
import logger from './logger';

export default applyMiddlware(thunk, checker, logger);
