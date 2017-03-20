export const GET_USER = "GET_USER";

export function getUserStatus(status, result, error){
  return {
    type: GET_USER,
    result,
    status,
    error
  }
}

export function getUser(){
  return function(dispatch){
    Tracker.autorun(() => {
      let user_id = Meteor.userId();
      let user = Meteor.user();

      if (user_id === null) {
        dispatch(getUserStatus("LOGGED_OUT", null));
      } else {
        if (user === null) {
          dispatch(getUserStatus("PROCESSING", null));
        } else {
          dispatch(getUserStatus("LOGGED_IN", user));
        }
      }
    });
  }
}
