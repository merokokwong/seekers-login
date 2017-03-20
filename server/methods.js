import { Meteor } from 'meteor/meteor';
import yahooFinance from 'yahoo-finance';


Meteor.methods({
  'get_stock_data': () => {
    if (Meteor.userId() === null) {
      // console.log("not user");
      // Logged out user shouldn't get the data.
      return;
    }else {
      return yahooFinance.historical({
        symbols: ["0005.HK"],
        from: "2017-01-01",
        to: "2017-01-15",
      })
    }


  }
});
