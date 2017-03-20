export const GET_STOCK_DATA = "GET_STOCK_DATA";

export function getStockStatus(status, result, error){
  return {
    type: GET_STOCK_DATA,
    result,
    status,
    error
  }
}
export function getStock(){
  return function(dispatch){
    dispatch(getStockStatus({status: "PROCESSING"}));

    Meteor.call('get_stock_data', (err, result) => {
      if(err){
        dispatch(getStockStatus("ERROR", null, err))
      }else {
        // console.log(result);
        dispatch(getStockStatus("SUCCESS", result))
      }
    })
  }
}
