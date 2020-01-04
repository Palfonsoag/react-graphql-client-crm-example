import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { AUTHENTICATE_USER_MUTATION } from "../../mutations";
import ErrorAlert from "../common/ErrorAlert";
import Loader from "../common/Loader";

const initialState = {
  user: "",
  password: "",
  showLoader: false
};
class Login extends Component {
  state = { ...initialState };

  updateState = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  cleanState = () => {
    this.setState({ ...initialState });
  };

  logIn = (e, userAuthentication) => {
    this.setState({ showLoader: true });
    e.preventDefault();
    userAuthentication()
      .then(async ({ data }) => {
        //console.log(data);
        localStorage.setItem("token", data.userAuthentication.token);
        await this.props.refetch();

        setTimeout(() => {
          this.cleanState();
          this.props.history.push("/panel");
        }, 2000);
      })
      .catch(error => {
        this.setState({ showLoader: false });
        console.log(error);
      });
  };

  validateForm = () => {
    const { user, password } = this.state;

    const disabled = !user || !password;

    return disabled;
  };

  render() {
    const { user, password, showLoader } = this.state;

    return (
      <React.Fragment>
        <h1 className="text-center mb-5">Log In</h1>
        {showLoader ? <Loader /> : <React.Fragment />}
        <div className="row  justify-content-center">
          <Mutation
            mutation={AUTHENTICATE_USER_MUTATION}
            variables={{ user, password }}
          >
            {(userAuthentication, { loading, error, data }) => {
              return (
                <form
                  onSubmit={e => this.logIn(e, userAuthentication)}
                  className="col-md-8"
                >
                  {error && <ErrorAlert message={error.message} />}

                  <div className="form-group">
                    <label>Username</label>
                    <input
                      disabled={showLoader || loading}
                      onChange={this.updateState}
                      value={user}
                      type="text"
                      name="user"
                      className="form-control"
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      disabled={showLoader || loading}
                      onChange={this.updateState}
                      value={password}
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <button
                    disabled={loading || showLoader || this.validateForm()}
                    type="submit"
                    className="btn btn-success float-right"
                  >
                    Log In
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

export default withRouter(Login);
