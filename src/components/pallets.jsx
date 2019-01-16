import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class Pallets extends Component {
  state = {
    pallets: [],
    spots: [],
    spot_id: this.props.match.params.spot_id,
    stock_id: null,
    prev_id: null,
    next_id: null,
    spot: {
      name: null,
      level_id: null
    },
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
    this.getDataFromDb(this.state.spot_id);
  }

  getDataFromDb = spot_id => {
    // Getting spots in database order for next and previous spot functionality
    axios.get("http://localhost:3001/api/spots/GetAllSpots").then(res => {
      if (res.status === 200) this.setState({ spots: res.data });
      for (var i = 0; i < this.state.spots.length; i++) {
        if (this.state.spots[i]._id === spot_id) {
          if (i !== 0) this.setState({ prev_id: this.state.spots[i - 1]._id });
          else
            this.setState({
              prev_id: this.state.spots[this.state.spots.length - 1]._id
            });

          if (i !== this.state.spots.length - 1)
            this.setState({ next_id: this.state.spots[i + 1]._id });
          else this.setState({ next_id: this.state.spots[0]._id });
          break;
        }
      }
    });

    // Get all pallets in this spot
    axios
      .get("http://localhost:3001/api/pallets/GetPallets", {
        params: {
          spot_id
        }
      })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) this.setState({ pallets: res.data });
      });

    // Get breadcrumbs
    axios
      .get("http://localhost:3001/api/spots/GetSpot", {
        params: {
          spot_id
        }
      })
      .then(res => {
        if (res.status === 200) this.setState({ spot: res.data });
      })
      .then(() => {
        axios
          .get("http://localhost:3001/api/levels/GetLevel", {
            params: {
              level_id: this.state.spot.level_id
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
          });
      });
  };

  createPallet = () => {
    var spot_id = this.state.spot_id;
    axios
      .post("http://localhost:3001/api/pallets/CreatePallet", {
        spot_id
      })
      .then(res => {
        this.setState({ stock_id: res.data.stock._id });
        this.props.history.push("/products/" + this.state.stock_id);
      });
  };

  removePallet = pallet_id => {
    axios
      .post("http://localhost:3001/api/pallets/RemovePallet", {
        pallet_id
      })
      .then(() => {
        this.setState(state => ({
          pallets: state.pallets.filter(item => item._id !== pallet_id)
        }));
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-sm-2">
            <Link
              className="col-md-12 btn btn-primary btn-lg"
              to={"/spots/" + this.state.spot.level_id}
            >
              <i className="fa fa-chevron-left" />
              &nbsp;Back
            </Link>
          </div>
          <div className="col-sm-8">
            <h5 className="text-center m-2">
              <Link to="/">Locations</Link> -
              <Link to={"/positions/" + this.state.position.location_id}>
                {" "}
                {this.state.location_name}
              </Link>{" "}
              -
              <Link to={"/sections/" + this.state.section.position_id}>
                {" "}
                {this.state.position.name}
              </Link>{" "}
              -
              <Link to={"/levels/" + this.state.level.section_id}>
                {" "}
                {this.state.section.name}
              </Link>{" "}
              -
              <Link to={"/spots/" + this.state.spot.level_id}>
                {" "}
                {this.state.level.name}
              </Link>{" "}
              - {this.state.spot.name}
            </h5>
          </div>
          <div className="col-sm-2">
            <Link className="col-md-12 btn btn-default btn-lg" to="/search">
              <i className="fa fa-search" />
              &nbsp;Search
            </Link>
          </div>
        </div>
        <hr />
        <div className="row text-center">
          {this.state.pallets.map(pallet => (
            <div key={pallet._id} className="col-sm-12">
              <div className="col-sm-9 inlineBlock">
                {pallet.stocks.map(stock => (
                  <Link
                    key={stock._id}
                    to={"/products/" + stock._id}
                    className={
                      "btn btn-default btn-lg border " + (pallet.stocks.length ===
                      1
                        ? "col-sm-12"
                        : pallet.stocks.length === 2
                        ? "col-sm-6"
                        : pallet.stocks.length === 3
                        ? "col-sm-4"
                        : "col-sm-2")
                    }
                  >
                    {pallet.stocks.length === 1 ? (
                      <label>yes</label>
                    ) : (
                      <label>no</label>
                    )}
                    {/* {stock.produce_id}&nbsp;
                  {stock.size_id}&nbsp;
                  {stock.color_id}&nbsp;
                  {stock.grower_id} */}
                  </Link>
                ))}
              </div>
              <div className="col-sm-3 inlineBlock noPaddings">
                <button className="col-sm-3 btn btn-primary btn-lg text-white editor">
                  <i className="fa fa-edit" />
                </button>
                <button className="col-sm-3 btn btn-info btn-lg text-white editor">
                  <i className="fa fa-arrows-alt" />
                </button>
                <button className="col-sm-3 btn btn-warning btn-lg text-white editor">
                  <i className="fa fa-list-ul" />
                </button>
                <button
                  className="col-sm-3 btn btn-danger btn-lg text-white editor"
                  onClick={() => this.removePallet(pallet._id)}
                >
                  <i className="fa fa-trash" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Button
              onClick={this.createPallet}
              className="col-md-12 btn btn-lg btn-success"
            >
              <label className="h2">
                <i className="fa fa-plus" /> Add Pallet
              </label>
            </Button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-6">
            <button
              href={"/pallets/" + this.state.prev_id}
              className="btn btn-warning btn-lg col-md-12"
            >
              <label className="h2 text-white">
                <i className="fa fa-backward" /> Previous Spot
              </label>
            </button>
          </div>
          <div className="col-sm-6">
            <button
              href={"/pallets/" + this.state.next_id}
              className="btn btn-primary btn-lg col-md-12"
            >
              <label className="h2">
                Next Spot <i className="fa fa-forward" />
              </label>
            </button>
          </div>
        </div>
        <br />
      </React.Fragment>
    );
  }
}

export default Pallets;
