import {
    GET_USER
} from '/imports/startup/client/actions/userActions.js'


const userState = (state = {
  result: null
}, action) => {

  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        result: action.result
      });
      break;

    default:
      return state
  }
}
export default userState;
