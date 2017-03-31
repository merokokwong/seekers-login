import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { routerMiddleware, push } from 'react-router-redux';

import { getUser } from '/imports/startup/client/actions/userActions.js';
import { getStock } from '/imports/startup/client/actions/stockActions.js';

import { LineChart, Line, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {

}
const chartOptions = {
    bezierCurve : false,
    datasetFill : false,
    pointDotStrokeWidth: 4,
    scaleShowVerticalLines: false,
    responsive: false
};
const maxDate = new Date();



const mapStateToProps = (state) => {
    return{
      logInState: state.userState.status,
      user: state.userState.result,
      stockData: state.stockState.result
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
      redirectToLogin: ()=>{
        dispatch(push('/LogIn'));
      },
      getUser: () => {
        dispatch(getUser())
      },
      getStock: (fromDate, toDate) => {
        dispatch(getStock(fromDate, toDate))
      },
    }
}

const LogIn = class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state={
          userName: null,
          data: null,
          fromDate: null,
          toDate: null
      }
    }


    componentDidMount(){
      today = new Date();
      yesterday = new Date(today.setDate(today.getDate() - 1));
      sevenDaybefore = new Date(today.setDate(today.getDate() - 7));

      this.props.getUser();
      this.props.getStock(sevenDaybefore, yesterday);

    }
    componentWillReceiveProps(nextProps){
      if (this.props.logInState !== nextProps.logInState && nextProps.logInState === "LOGGED_OUT"){
        this.props.redirectToLogin();
      }
      if (this.props.stockData !== nextProps.stockData && nextProps.stockData !== null && nextProps.stockData !== undefined){
        console.log(nextProps.stockData);
        let result = _.map(nextProps.stockData["0005.HK"], (eachData) => {
          let formattedDate = moment(eachData.date).format("DD/MM")
          return {
            date : formattedDate,
            open: eachData.open,
            close: eachData.close,
            high: eachData.high,
            low: eachData.low,
            volume: eachData.volume

          }
        })

        this.setState({
          data: result
        })
      }
    }
    changeFromDatePicker(event, date){
      this.setState({
        fromDate: date
      })
    }
    changeToDatePicker(event, date){
      this.setState({
        toDate: date
      })
    }
    checkStock(){
      this.props.getStock(this.state.fromDate, this.state.toDate);
    }


    render() {
      // console.log(this.state.data);

      if(!this.props.user){
        return (
          <div className="redirect-message">Redirecting to login...</div>
        );
      } else {
        return (
          <div className="test-container">
            <span className="logo" onClick={()=>{
                Meteor.logout()
              }}>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              <span>Log out</span>
            </span>
            <h1>
              Welcome {this.props.user.profile.name}
            </h1>
            <div className="body-container">
              <div className="dayPickerContainer">
                <DatePicker hintText="From"
                  autoOk={true}
                  maxDate={maxDate}
                  onChange={(event, date)=>{
                    this.changeFromDatePicker(event, date)
                  }}/>
                <DatePicker hintText="To"
                  autoOk={true}
                  maxDate={maxDate}
                  onChange={(event, date)=>{
                    this.changeToDatePicker(event, date)
                  }}/>
                <RaisedButton label="Check" primary={true}
                  onClick={()=>{
                    this.checkStock()
                  }}/>
              </div>

              <div className="displayData">
                <h3>HSBC History</h3>
                  {this.state.data
                    ?
                    <LineChart width={600} height={400} data={this.state.data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <Line type="monotone" dataKey="open" stroke="#8884d8" />
                      <Line type="monotone" dataKey="close" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="high" stroke="#ffd700" />
                      <Line type="monotone" dataKey="low" stroke="#890045" />
                        <XAxis dataKey="date" padding={{ left: 0, right: 20 }}/>
                        <YAxis type="number" domain={['dataMin', 'dataMax']}
                          padding={{ top: 20, bottom: 30 }}/>
                        <Tooltip/>
                        <Legend />
                    </LineChart>
                    :
                    null
                  }
              </div>
            </div>


          </div>
        );
      }
    }
}

const LogInConnected = connect(mapStateToProps, mapDispatchToProps)(LogIn)

export default LogInConnected
