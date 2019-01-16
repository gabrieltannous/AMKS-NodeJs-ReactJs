import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Growers extends Component {
  state = {
    growers: [],
    stock_id: this.props.match.params.stock_id,
    stock_grower: null
  };
 
  componentDidMount() {
    this.getDataFromDb(this.state.stock_id);
  }

  getDataFromDb = stock_id => {
    var growers;
    axios.get("http://localhost:3001/api/growers/GetGrowers").then(res => {
      if (res.status === 200) growers = res.data;
      for(var j=0; j<growers.length; j++) {
          for(var i=0; i<growers.length - 1; i++) {
          if(growers[i].name[0] > growers[i+1].name[0]) {
            var temp = growers[i];
            growers[i] = growers[i+1];
            growers[i+1] = temp;
          }
        }
      }
      this.setState({ growers: growers});
    });

    axios.get("http://localhost:3001/api/stocks/GetStock", {
      params: {
        stock_id
      }
    }).then(res => {
      if (res.status === 200) this.setState({ stock_grower: res.data.grower_id });
    });
  };

  chooseGrower = grower_id => {
    var stock_id = this.state.stock_id;
    axios.post("http://localhost:3001/api/growers/ChooseGrower", {
      stock_id, grower_id
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-sm-2">
            <Link
              className="col-md-12 btn btn-primary btn-lg"
              to={"/grades/" + this.state.stock_id}
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

                <div className="col-sm-2 bs-wizard-step active">
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
          {this.state.growers.map(grower => (
            <div key={grower._id} className="col-sm-3">
              <Link
                onClick={() => this.chooseGrower(grower._id)}
                to={"/quantity/" + this.state.stock_id}
                className={"btn btn-lg col-md-12 m-2 " + (grower._id === this.state.stock_grower? "btn-success" : "btn-warning")}
              >
                <label className='h6'>{grower.name}</label>
              </Link>
            </div>
          ))}
          
        </div>
        
      </React.Fragment>
    );
  }
}

export default Growers;
