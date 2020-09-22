import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import orderReducer from './order';

const rootReducer = combineReducers({
  form: reducerForm,
  order: orderReducer
});

export default rootReducer;