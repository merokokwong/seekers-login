import { Meteor } from 'meteor/meteor';
import yahooFinance from 'yahoo-finance';


Meteor.methods({
  'get_stock_data': ({fromDate, toDate}) => {
    if (Meteor.userId() === null) {
      // console.log("not user");
      // Logged out user shouldn't get the data.
      return;
    }else {
      console.log(fromDate, toDate);
      let from = moment(fromDate).format("YYY-MM-DD");
      let to = moment(toDate).format("YYY-MM-DD");
      return yahooFinance.historical({
        symbols: ["0005.HK"],
        from: from,
        to: to,
      })
    }


  }
});
