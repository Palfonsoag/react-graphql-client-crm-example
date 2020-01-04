import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_NEW_USER_MUTATION } from "../../mutations";
import ErrorAlert from "../common/ErrorAlert";
const initialState = {
  user: "",
  password: "",
  confirmPassword: "",
  rol: "",
  name: ""
};

class Register extends Component {
  state = { ...initialState };

  updateState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRegister = (e, createUser) => {
    const { user, password, rol, name } = this.state;
    e.preventDefault();
    const input = { user, password, rol, name };

    createUser({ variables: { input } })
      .then(data => {
        this.setState({ ...initialState });
        this.props.history.push("/login");
      })
      .catch(error => console.log(error));
  };

  validateForm = () => {
    const { user, password, confirmPassword, name, rol } = this.state;

    const disabled =
      !user ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      !name ||
      !rol;

    return disabled;
  };

  render() {
    const { user, password, confirmPassword, name, rol } = this.state;
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
                    <small className="form-text text-muted">
                      (no space or special characters are allowed)
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      onChange={this.updateState}
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Full Name"
                      value={name}
                    />
                    <small className="form-text text-muted">
                      (write your full name)
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Rol</label>
                    <select
                      className="form-control"
                      value={rol}
                      name="rol"
                      onChange={this.updateState}
                    >
                      <option value="">Choose...</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="SELLER">SELLER</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
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
                    <div className="form-group col-md-6">
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
