import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { routerMiddleware, push } from 'react-router-redux';

const mapStateToProps = (state) => {
    return{

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
      redirectToTest: ()=>{
        dispatch(push('/Test'));
      },
    }
}

const LogIn = class LogIn extends Component {
    constructor(props) {
      super(props);

      this.state = {}

      this.loginWithFB = this.loginWithFB.bind(this);
      this.loginWithGoogle = this.loginWithGoogle.bind(this);
    }

    loginWithFB(){
      Meteor.loginWithFacebook({}, (err)=>{
        if(err){
          console.error("Facebook login failed", err);
        } else {
          this.props.redirectToTest();
        }
      })
    }
    loginWithGoogle(){
      Meteor.loginWithGoogle({}, (err) => {
        if(err){
          console.error("Google login failed", err);
        } else {
          this.props.redirectToTest();
        }
      })
    }


    render() {
      return (
          <div className="login-container">
            <div className="bg-overlay">
              <div className="login-form-container">
                <h1>Log In With</h1>
                <div className="logo-container">
                  <i className="fa fa-facebook-square" aria-hidden="true"
                    onClick={()=>{
                      this.loginWithFB()
                    }}></i>
                  <i className="fa fa-google" aria-hidden="true"
                    onClick={()=>{
                      this.loginWithGoogle()
                    }}></i>
                </div>

              </div>
            </div>
          </div>
      )
    }
}

const LogInConnected = connect(mapStateToProps, mapDispatchToProps)(LogIn)

export default LogInConnected
