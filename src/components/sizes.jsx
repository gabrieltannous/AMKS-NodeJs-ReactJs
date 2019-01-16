import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Sizes extends Component {
  state = {
    sizes: [],
    stock_id: this.props.match.params.stock_id,
    stock_size: null
  };

  componentDidMount() {
    this.getDataFromDb(this.state.stock_id);
  }

  getDataFromDb = stock_id => {
    axios.get("http://localhost:3001/api/sizes/GetSizes").then(res => {
      if (res.status === 200) this.setState({ sizes: res.data });
    });

    axios.get("http://localhost:3001/api/stocks/GetStock", {
      params: {
        stock_id
      }
    }).then(res => {
      if (res.status === 200) this.setState({ stock_size: res.data.size_id });
    });
  };

  chooseSize = size_id => {
    var stock_id = this.state.stock_id;
    axios.post("http://localhost:3001/api/sizes/ChooseSize", {
      stock_id, size_id
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-sm-2">
            <Link
              className="col-md-12 btn btn-primary btn-lg"
              to={"/colors/" + this.state.stock_id}
            >
              <i className="fa fa-chevron-left" />
              &nbsp;Back
            </Link>
          </div>
          <div className="col-sm-8">
            <div className="container">
              <div className="row bs-wizard" style={{ borderBottom: 0 }}>
                <div className="col-sm-2 bs-wizard-step complete">
                  <div className="text-center bs-wizard-stepnum">Produce</div>
                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <Link to={"ChooseProduce"} className="bs-wizard-dot" />
                </div>

                <div className="col-sm-2 bs-wizard-step complete">
                  <div className="text-center bs-wizard-stepnum">Color</div>
                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <Link to={"ChooseColor"} className="bs-wizard-dot" />
                </div>

                <div className="col-sm-2 bs-wizard-step active">
                  <div className="text-center bs-wizard-stepnum">Size</div>
                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <Link to="ChooseSize" className="bs-wizard-dot" />
                </div>

                <div className="col-sm-2 bs-wizard-step disabled">
                  <div className="text-center bs-wizard-stepnum">Grade</div>
                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <Link to="ChooseGrade" className="bs-wizard-dot" />
                </div>

                <div className="col-sm-2 bs-wizard-step disabled">
                  <div className="text-center bs-wizard-stepnum">Grower</div>
                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <Link to="ChooseGrower" className="bs-wizard-dot" />
                </div>

                <div className="col-sm-2 bs-wizard-step disabled">
                  <div className="text-center bs-wizard-stepnum">Quantity</div>
                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <Link to="ChooseQuantity" className="bs-wizard-dot" />
                </div>
              </div>
            </div>
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
          {this.state.sizes.map(size => (
            <div key={size._id} className="col-sm-3">
              <Link
                onClick={() => this.chooseSize(size._id)}
                to={"/grades/" + this.state.stock_id}
                className={"btn btn-lg col-md-12 m-2 " + (size._id === this.state.stock_size? "btn-success" : "btn-warning")}
              >
                <label className="h2">{size.name}</label>
              </Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Sizes;
