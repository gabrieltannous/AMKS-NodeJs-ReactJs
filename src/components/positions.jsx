import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Positions extends Component {
  state = {
    positions: [],
    location_id: this.props.match.params.location_id,
    location_name: null
  };

  componentDidMount() {
    this.getDataFromDb(this.state.location_id);
  }

  getDataFromDb = location_id => {
    axios.get("http://localhost:3001/api/positions/GetPositions", {
      params: {
        location_id
      }
    }).then(
      res => {
        if (res.status === 200)
          this.setState({ positions: res.data });
      }
    );

    axios.get("http://localhost:3001/api/locations/GetLocation", {
      params: {
        location_id
      }
    }).then(
      res => {
        if (res.status === 200)
          this.setState({ location_name: res.data.name });
      }
    );
  };

  putDataToDB = (name, code, location_id) => {
    axios.post("http://localhost:3001/api/positions/CreatePosition", {
      name, code, location_id
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-sm-2">
            <Link to="/" className="col-md-12 btn btn-primary btn-lg">
              <i className="fa fa-chevron-left" />
              &nbsp;Back
            </Link>
          </div>
          <div className="col-sm-8">
            <h4 className="text-center m-1">
              <Link to="/">Locations</Link> - {this.state.location_name}
            </h4>
          </div>
          <div className="col-sm-2">
            <Link className="col-md-12 btn btn-default btn-lg" to="/search">
              <i className="fa fa-search" />
              &nbsp;Search
            </Link>
          </div>
        </div>
        <hr />
        <div className="row">
          {this.state.positions.map(position => (
            <div key={position._id} className="col-sm-4 text-center">
              <Link className="btn btn-success col-md-12 m-2" to={"/sections/" + position._id}>
                <label className="h2">{position.name}</label>
              </Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Positions;
