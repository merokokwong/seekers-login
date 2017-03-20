import {
    GET_STOCK_DATA
} from '/imports/startup/client/actions/stockActions.js'


const stockState = (state = {
  result: null
}, action) => {

  switch (action.type) {
    case GET_STOCK_DATA:
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
export default stockState;
