import React, { Component } from "react";
import { NEW_CLIENT_MUTATION } from "../../mutations";
import { Mutation } from "react-apollo";
export default class NewClient extends Component {
  state = {
    name: "",
    lastName: "",
    company: "",
    email: "",
    emails: [{ email: "" }],
    age: 0,
    clientType: "",
    error: false
  };

  newEmail = () => {
    this.setState({ emails: this.state.emails.concat([{ email: "" }]) });
  };

  removeEmail = i => () => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    });
  };

  readEmail = i => e => {
    const newEmailArray = this.state.emails.map((email, index) => {
      if (i !== index) return email;
      return {
        ...email,
        email: e.target.value
      };
    });
    this.setState({ emails: newEmailArray });
  };

  render() {
    const { error, name, lastName, company, age } = this.state;
    return (
      <React.Fragment>
        <h2 className="text-center">New Client</h2>
        {error ? (
          <p className="alert alert-danger p-3 text-center">
            All fields are required And the client must be at least 18 years old
          </p>
        ) : (
          <React.Fragment />
        )}
        <div className="row justify-content-center">
          <Mutation
            mutation={NEW_CLIENT_MUTATION}
            onCompleted={() => this.props.history.push("/client")}
          >
            {createClient => (
              <form
                className="col-md-8 m-3"
                onSubmit={e => {
                  e.preventDefault();
                  const {
                    name,
                    lastName,
                    company,
                    emails,
                    age,
                    clientType
                  } = this.state;

                  if (
                    name === "" ||
                    lastName === "" ||
                    company === "" ||
                    company === "" ||
                    age === "" ||
                    age < 18 ||
                    clientType === ""
                  ) {
                    this.setState({ error: true });
                    return;
                  }
                  this.setState({ error: false });
                  const input = {
                    name,
                    lastName,
                    company,
                    emails,
                    clientType,
                    age: Number(this.state.age)
                  };
                  createClient({ variables: { input } });
                }}
              >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      onChange={text =>
                        this.setState({ name: text.target.value })
                      }
                      value={name}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={text =>
                        this.setState({ lastName: text.target.value })
                      }
                      value={lastName}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Company:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Compnay"
                      onChange={text =>
                        this.setState({ company: text.target.value })
                      }
                      value={company}
                    />
                  </div>
                </div>
                <div className="form-row">
                  {this.state.emails.map((input, index) => (
                    <div key={index} className="form-group col-md-12">
                      <label>Email {index + 1}:</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          onChange={this.readEmail(index)}
                        />
                        <div className="input-group-append">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.removeEmail(index)}
                          >
                            &times; Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="form-group d-flex justify-content-center col-md-12">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={this.newEmail}
                  >
                    + Add Email
                  </button>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Age:</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Age"
                      value={age}
                      onChange={text => {
                        if (text.target.value < 0) {
                          text.target.value = 0;
                        }
                        this.setState({ age: text.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Client's Type</label>
                    <select
                      className="form-control"
                      onChange={text =>
                        this.setState({ clientType: text.target.value })
                      }
                    >
                      <option value="">Choose...</option>
                      <option value="PREMIUM">PREMIUM</option>
                      <option value="BASIC">BASIC</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-success float-right">
                  Save
                </button>
              </form>
            )}
          </Mutation>
        </div>
      </React.Fragment>
    );
  }
}
