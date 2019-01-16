import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Spots extends Component {
  state = {
    spots: [],
    level_id: this.props.match.params.level_id,
    level: {
      name: null,
      section_id: null
    },
    section: {
      name: null,
      position_id: null
    },
    position: {
      name: null,
      location_id: null
    },
    location_name: null
  };

  componentDidMount() {
    this.getDataFromDb(this.state.level_id);
  }

  getDataFromDb = level_id => {
    axios
      .get("http://localhost:3001/api/spots/GetSpots", {
        params: {
          level_id
        }
      })
      .then(res => {
        if (res.status === 200) this.setState({ spots: res.data });
      });

    axios
      .get("http://localhost:3001/api/levels/GetLevel", {
        params: {
          level_id
        }
      })
      .then(res => {
        if (res.status === 200) this.setState({ level: res.data });
      })
      .then(() => {
        axios
          .get("http://localhost:3001/api/sections/GetSection", {
            params: {
              section_id: this.state.level.section_id
            }
          })
          .then(res => {
            if (res.status === 200) this.setState({ section: res.data });
          })
          .then(() => {
            axios
              .get("http://localhost:3001/api/positions/GetPosition", {
                params: {
                  position_id: this.state.section.position_id
                }
              })
              .then(res => {
                if (res.status === 200) this.setState({ position: res.data });
              })
              .then(() => {
                axios
                  .get("http://localhost:3001/api/locations/GetLocation", {
                    params: {
                      location_id: this.state.position.location_id
                    }
                  })
                  .then(res => {
                    if (res.status === 200)
                      this.setState({ location_name: res.data.name });
                  });
              });
          });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-sm-2">
            <Link
              className="col-md-12 btn btn-primary btn-lg"
              to={"/levels/" + this.state.level.section_id}
            >
              <i className="fa fa-chevron-left" />
              &nbsp;Back
            </Link>
          </div>
          <div className="col-sm-8">
            <h4 className="text-center m-1">
              <Link to="/">Locations</Link> - 
              <Link to={"/positions/" + this.state.position.location_id}> {this.state.location_name}</Link> -
              <Link to={"/sections/" + this.state.section.position_id}> {this.state.position.name}</Link> -
              <Link to={"/levels/" + this.state.level.section_id}> {this.state.section.name}</Link> - {this.state.level.name}
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
          {this.state.spots.map(spot => (
            <div key={spot._id} className="col-sm-4 text-center">
              <Link
                className="btn btn-success col-md-12 m-2"
                to={"/pallets/" + spot._id}
              >
                <label className="h2">{spot.name}</label>
              </Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Spots;
