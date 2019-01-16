import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Levels extends Component {
  state = {
    levels: [],
    section_id: this.props.match.params.section_id,
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
    this.getDataFromDb(this.state.section_id);
  }

  getDataFromDb = section_id => {
    axios
      .get("http://localhost:3001/api/levels/GetLevels", {
        params: {
          section_id
        }
      })
      .then(res => {
        if (res.status === 200) this.setState({ levels: res.data });
      });

    axios
      .get("http://localhost:3001/api/sections/GetSection", {
        params: {
          section_id
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
            if (res.status === 200)
              this.setState({ position: res.data });
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
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-sm-2">
            <Link className="col-md-12 btn btn-primary btn-lg" to={"/sections/" + this.state.section.position_id}>
              <i className="fa fa-chevron-left" />
              &nbsp;Back
            </Link>
          </div>
          <div className="col-sm-8">
            <h4 className="text-center m-1">
              <Link to="/">Locations</Link> -
              <Link to={"/positions/" + this.state.position.location_id}> {this.state.location_name}</Link> -
              <Link to={"/sections/" + this.state.section.position_id}> {this.state.position.name}</Link> - {this.state.section.name}
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
          {this.state.levels.map(level => (
            <div key={level._id} className="col-sm-6 text-center">
              <Link
                className="btn btn-success col-md-12 m-2"
                to={"/spots/" + level._id}
              >
                <label className="h2">{level.name}</label>
              </Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Levels;
