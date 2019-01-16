import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class DateC extends Component {
  state = {
    stock_id: this.props.match.params.stock_id,
    pallet_id: null,
    spot_id: null,
    pallet_date: ''
  };

  componentDidMount() {
    this.getDataFromDb(this.state.stock_id);
  }

  getDataFromDb = stock_id => {
    axios.get("http://localhost:3001/api/pallets/GetPalletByStock", {
      params: {
        stock_id
      }
    }).then(res => {
      console.log(res.data);
      if (res.status === 200) this.setState({ pallet_date: res.data.date, pallet_id: res.data._id, spot_id: res.data.spot_id });
    });
  }

  chooseDate = () => {
    var pallet_id = this.state.pallet_id;
    var date = document.getElementById("calculator").value;
    axios.post("http://localhost:3001/api/pallets/ChooseDate", {
      pallet_id,
      date
    });
  };

  inputNumber = number => {
    document.getElementById("palletDate").value += number;
  };

  erase = () => {
    document.getElementById("palletDate").value = document
      .getElementById("palletDate")
      .value.slice(0, -1);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-sm-2">
            <Link
              className="col-md-12 btn btn-primary btn-lg"
              to={"/quantity/" + this.state.stock_id}
            >
              <i className="fa fa-chevron-left" />
              &nbsp;Back
            </Link>
          </div>
          <div className="col-sm-8">
            <div className="container text-center">
              <h3>Pallet Date</h3>
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
              type="text"
              id="palletDate"
              className="col-sm-6 form-control"
              value={this.state.pallet_date}
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
            <button
              className="col-sm-4 btn btn-default btn-lg border calculator"
              onClick={() => this.inputNumber('/')}
            >
              /
            </button>
            <Link
              to={"/pallets/" + this.state.spot_id}
              className="col-sm-4 btn btn-success btn-lg calculator"
              onClick={this.chooseDate}
            >Save</Link>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default DateC;
