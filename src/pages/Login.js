import React from 'react';
//import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import firebase from '../firebase';

import { withRouter } from 'react-router-dom';
import * as auth from '../services/auth';
import '../css/login.scss';

class Login extends React.Component {
  token = '';

  state = {
    email: '',
    password: '',
  };

  async componentDidMount() {}

  invalidUser = () => console.log('Password o usuario invalido.');

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const result = await auth.login({ email, password });
    if (result) {
      firebase
        .auth()
        .signInAnonymously()
        .catch(error => {
          console.log('firebase auth error', error.message);
        });

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          localStorage.setItem('sessionKey', result.token);
          this.props.history.push('/main');
          // ...
        } else {
          // User is signed out.
          // ...
        }
        // ...
      });
    }
  };

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  goTo = () => {
    this.props.history.push('/main');
  };

  render() {
    return (
      <div className="d-flex ai-center jc-center" style={{ height: '100vh' }}>
        <div>
          <div id="formulario">
            <div className="form-container">
              <h1 className="f-20 ma-0 fw-400">INGRESAR AL SISTEMA</h1>
              <br />
              <br />
              <form
                method="post"
                onSubmit={event => {
                  this.handleSubmit(event);
                  //navigate(`/app/board`)
                }}
              >
                <label htmlFor="email" className="fw-100">
                  Usuario <br />
                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="user@email.com"
                    className="form-control"
                    onChange={this.handleUpdate}
                  />
                </label>

                <label htmlFor="password" className="fw-100 ma-top-20 d-block">
                  Contraseña
                  <br />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="*********"
                    className="form-control"
                    onChange={this.handleUpdate}
                  />
                </label>
                <br />
                <input
                  type="submit"
                  value="INGRESAR"
                  className="btn btn-primary w-100 ma-top-10"
                />
              </form>
            </div>
          </div>
          <p className="t-center fw-300" style={{ letterSpacing: '1px' }}>
            Powered by DINA.ec <br />
            <small className="fw-100" style={{ letterSpacing: '1px' }}>
              www.dina.ec
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
