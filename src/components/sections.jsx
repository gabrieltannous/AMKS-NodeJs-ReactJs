import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Sections extends Component {
  state = {
    sections: [],
    position_id: this.props.match.params.position_id,
    position: {
      name: null,
      location_id: null
    },
    location_name: null
  };

  componentDidMount() {
    this.getDataFromDb(this.state.position_id);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  getDataFromDb = position_id => {
    axios
      .get("http://localhost:3001/api/sections/GetSections", {
        params: {
          position_id
        }
      })
      .then(res => {
        if (res.status === 200) this.setState({ sections: res.data });
      });

    axios
      .get("http://localhost:3001/api/positions/GetPosition", {
        params: {
          position_id
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
  };

  putDataToDB = (name, code, position_id) => {
    axios.post("http://localhost:3001/api/sections/CreateSection", {
      name,
      code,
      position_id
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-sm-2">
            <Link
              className="col-md-12 btn btn-primary btn-lg"
              to={"/positions/" + this.state.position.location_id}
            >
              <i className="fa fa-chevron-left" />
              &nbsp;Back
            </Link>
          </div>
          <div className="col-sm-8">
            <h4 className="text-center m-1">
              <Link to="/">Locations</Link> -{" "}
              <Link to={"/positions/" + this.state.position.location_id}>
                {this.state.location_name}
              </Link>{" "}- {this.state.position.name}
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
          {this.state.sections.map(section => (
            <div key={section._id} className="col-sm-4 text-center">
              <Link className="btn btn-success col-md-12 m-2" to={"/levels/" + section._id}>
                <label className="h2">{section.name}</label>
              </Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Sections;
