import React, { Component } from 'react';
import './App.css';
import Locations from './components/locations';
import Positions from './components/positions';
import Sections from './components/sections';
import Levels from './components/levels';
import Pallets from './components/pallets';
import Spots from './components/spots';
import Products from './components/products';
import Footer from './components/footer';
import {Router, Route} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import Colors from './components/colors';
import Sizes from './components/sizes';
import Grades from './components/grades';
import Growers from './components/growers';
import Quantity from './components/quantity';
import DateC from './components/date';
// import routes from './Routes';

class App extends Component {
  render() {
    const history = createHistory();

    // Dirty Fix to scroll back to top on route changed :D
    history.listen((location, action) => {
      window.scroll(0, 0);
    });

    return (
      <div className="container">
        <Router history={history}>
          <div className="App">
            <Route exact path="/" component={Locations} />
            <Route exact path="/positions/:location_id" component={Positions} />
            <Route exact path="/sections/:position_id" component={Sections} />
            <Route exact path="/levels/:section_id" component={Levels} />
            <Route exact path="/spots/:level_id" component={Spots} />
            <Route exact path="/pallets/:spot_id" component={Pallets} />
            <Route exact path="/products/:stock_id" component={Products} />
            <Route exact path="/colors/:stock_id" component={Colors} />
            <Route exact path="/sizes/:stock_id" component={Sizes} />
            <Route exact path="/grades/:stock_id" component={Grades} />
            <Route exact path="/growers/:stock_id" component={Growers} />
            <Route exact path="/quantity/:stock_id" component={Quantity} />
            <Route exact path="/date/:stock_id" component={DateC} />
            <hr />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
