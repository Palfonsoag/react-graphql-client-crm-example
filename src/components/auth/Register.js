import React, { Component } from "react";

const initialState = { user: "", password: "", confirmPassword: "" };

class Register extends Component {
  state = { ...initialState };

  updateState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { user, password, confirmPassword } = this.state;

    const disabled =
      !user || !password || !confirmPassword || password !== confirmPassword;

    return disabled;
  };

  render() {
    const { user, password, confirmPassword } = this.state;
    return (
      <React.Fragment>
        <h1 className="text-center mb-5">New User</h1>
        <div className="row  justify-content-center">
          <form className="col-md-8">
            <div className="form-group">
              <label>User</label>
              <input
                onChange={this.updateState}
                type="text"
                name="user"
                className="form-control"
                placeholder="Username"
                value={user}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={this.updateState}
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                onChange={this.updateState}
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success float-right"
              disabled={this.validateForm()}
            >
              Create User
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
