import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Quantity extends Component {
  state = {
    stock_id: this.props.match.params.stock_id,
    stock_quantity: ''
  };

  componentDidMount() {
    this.getDataFromDb(this.state.stock_id);
  }

  getDataFromDb = stock_id => {
    axios.get("http://localhost:3001/api/stocks/GetStock", {
      params: {
        stock_id
      }
    }).then(res => {
      if (res.status === 200) this.setState({ stock_quantity: res.data.quantity });
    });
  }

  chooseQuantity = () => {
    var stock_id = this.state.stock_id;
    var quantity = document.getElementById("calculator").value;
    axios.post("http://localhost:3001/api/stocks/ChooseQuantity", {
      stock_id,
      quantity
    });
  };

  inputNumber = number => {
    document.getElementById("calculator").value += number;
  };

  erase = () => {
    document.getElementById("calculator").value = document
      .getElementById("calculator")
      .value.slice(0, -1);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-sm-2">
            <Link
              className="col-md-12 btn btn-primary btn-lg"
              to={"/growers/" + this.state.stock_id}
            >
              <i className="fa fa-chevron-left" />
              &nbsp;Back
            </Link>
          </div>
          <div className="col-sm-8">
            <div className="container">
              <div className="row bs-wizard" style={{ border: 0 }}>
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

                <div className="col-sm-2 bs-wizard-step complete">
                  <div className="text-center bs-wizard-stepnum">Size</div>
                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <Link to="ChooseSize" className="bs-wizard-dot" />
                </div>

                <div className="col-sm-2 bs-wizard-step complete">
                  <div className="text-center bs-wizard-stepnum">Grade</div>
                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <Link to="ChooseGrade" className="bs-wizard-dot" />
                </div>

                <div className="col-sm-2 bs-wizard-step complete">
                  <div className="text-center bs-wizard-stepnum">Grower</div>
                  <div className="progress">
                    <div className="progress-bar" />
                  </div>
                  <Link to="ChooseGrower" className="bs-wizard-dot" />
                </div>

                <div className="col-sm-2 bs-wizard-step active">
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
          <div className="col-sm-6">
            <input
              type="number"
              id="calculator"
              className="col-sm-6 form-control"
              value={this.state.stock_quantity}
              readOnly
            />
          </div>
          <div className="col-sm-6">
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(1)}
            >
              1
            </button>
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(2)}
            >
              2
            </button>
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(3)}
            >
              3
            </button>
            <br />
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(4)}
            >
              4
            </button>
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(5)}
            >
              5
            </button>
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(6)}
            >
              6
            </button>
            <br />
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(7)}
            >
              7
            </button>
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(8)}
            >
              8
            </button>
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(9)}
            >
              9
            </button>
            <br />
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={this.erase}
            >
              Del
            </button>
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber(0)}
            >
              0
            </button>
            <Link
              to={"/date/" + this.state.stock_id}
              className="col-sm-4 btn btn-success btn-lg calculator"
              onClick={this.chooseQuantity}
            >Save</Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Quantity;
