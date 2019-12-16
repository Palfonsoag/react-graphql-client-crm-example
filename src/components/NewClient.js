import React, { Component } from "react";

export default class NewClient extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className="text-center">New Client</h2>
        <div className="row justify-content-center">
          <form className="col-md-8 m-3">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Company</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Compnay"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Age</label>
                <input type="text" className="form-control" placeholder="Age" />
              </div>
              <div className="form-group col-md-6">
                <label>Client's Type</label>
                <select className="form-control">
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
        </div>
      </React.Fragment>
    );
  }
}
