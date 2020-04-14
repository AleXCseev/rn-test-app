import {createStore, combineReducers, applyMiddleware} from 'redux';
import {userReducer} from './reducers/user';
import thunkMiddleware from 'redux-thunk';
import Service from '../service/service';

const service = new Service();

const rootReducer = combineReducers({
  user: userReducer,
});

const loadUser = (dispatch) => {
  const res = service.getAllUsers();
  res.then((users) => {
    dispatch({
      type: 'LOAD_USERS',
      payload: users,
    });
  });
};

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

store.dispatch(loadUser);
export default store;
