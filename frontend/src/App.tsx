import * as React from 'react';
import './App.css';

import GoogleLogin from 'react-google-login';
import axios from 'axios';
import logo from './logo.svg';

import {serverURL, googleAuthURL} from './config';

import Users from './Users'
import 'element-theme-default'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
      <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <GoogleLogin
          clientId={googleAuthURL}
          buttonText="Login"
          onSuccess={this.loginSuccessful}
          onFailure={this.loginFailed}
        />
        <Users/>
      </div>
      </Provider>
      </BrowserRouter>
    );
  }

  private loginSuccessful = async (response :any) => {
    console.log(response)
    try {
      const res = await axios.post(
        serverURL + '/api/googleAuth/', 
        {
          token: response.tokenId,
        }
      )
      alert (res.data.message);
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('tokenTimeStamp', new Date().toLocaleString());
    } catch (err) {
      console.error (err)
    }
  }
  private loginFailed = (response :any) => {
    console.warn(response)
  }
}

export default App;
