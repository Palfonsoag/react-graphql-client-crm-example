import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_NEW_USER_MUTATION } from "../../mutations";
import ErrorAlert from "../common/ErrorAlert";
const initialState = { user: "", password: "", confirmPassword: "" };

class Register extends Component {
  state = { ...initialState };

  updateState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRegister = (e, createUser) => {
    const { user, password } = this.state;
    e.preventDefault();
    const input = { user, password };

    createUser({ variables: { input } })
      .then(data => {
        this.setState({ ...initialState });
        this.props.history.push("/login");
      })
      .catch(error => console.log(error));
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
          <Mutation mutation={REGISTER_NEW_USER_MUTATION}>
            {(createUser, { loading, error, data }) => {
              return (
                <form
                  className="col-md-8"
                  onSubmit={e => this.handleRegister(e, createUser)}
                >
                  {error && <ErrorAlert message={error.message} />}
                  <div className="form-group">
                    <label>Username</label>
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
                    disabled={loading || this.validateForm()}
                  >
                    Create User
                  </button>
                </form>
              );
            }}
          </Mutation>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
