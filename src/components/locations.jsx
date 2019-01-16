import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Locations extends Component {
  state = {
    locations: []
  };

  componentDidMount() {
    this.getDataFromDb();
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 10000);
    //   this.setState({ intervalIsSet: interval });
    // }
  }

  getDataFromDb = () => {
    axios.get("http://localhost:3001/api/locations/GetLocations").then(
      res => {
        if (res.status === 200)
          this.setState({ locations: res.data });
      }
    );
  };

  putDataToDB = (name, code) => {
    axios.post("http://localhost:3001/api/locations/CreateLocation", {
      name, code
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            style={{ width: "200px" }}
          />
          <input
            type="text"
            onChange={e => this.setState({ code: e.target.value })}
            placeholder="Code"
            style={{ width: "200px" }}
          />
          <button
            onClick={() =>
              this.putDataToDB(this.state.message, this.state.code)
            }
          >
            ADD
          </button>
        </div>
        <h1 className="col-md-12 text-center" style={{ marginTop: 10 }}>
          AMKS Stock Location
        </h1>
        <hr />
        <div className="row text-center">
          {this.state.locations.map(location => (
            <div key={location._id} className="col-sm-6">
              <Link
                to={"/positions/" + location._id}
                className="btn btn-success btn-lg col-md-12"
              >
                <label className="h2">{location.name}</label>
              </Link>
            </div>
          ))}
        </div>
        <br />
        <div className="row">
          <div className="col-sm-6">
            <Link to="/search" className="btn btn-default btn-lg col-md-12">
              <label className="h2">
                <i className="fa fa-search" />
                &nbsp;Search
              </label>
            </Link>
          </div>
          <div className="col-sm-6">
            <Link to="/print" className="btn btn-primary btn-lg col-md-12">
              <label className="h2">
                <i className="fa fa-print" /> Print
              </label>
            </Link>
          </div>
        </div>
        <br />
        <div className="row text-center">
          <div className="col-sm-6">
            <Link to="/count" className="btn btn-warning btn-lg col-md-12">
              <label className="h2">
                <i className="fa fa-list" /> Count
              </label>
            </Link>
          </div>
          <div className="col-sm-6">
            <Link to="/admin" className="btn btn-danger btn-lg col-md-12">
              <label className="h2">
                <i className="fa fa-user" /> Admin
              </label>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Locations;
