import { combineReducers } from 'redux';

interface ActionType {
  type: string;
  payload: any;
}

interface SomethingAction extends ActionType {
payload: string;
}

const somethingReducer = (state = null, action:SomethingAction) => {
  switch (action.type) {
case 'SOMETHING':
  return action.payload
    default:
      return state
  }
}


export default combineReducers({
something:somethingReducer
});