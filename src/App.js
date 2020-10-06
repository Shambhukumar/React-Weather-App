import React from "react";
import axios from "axios";

import "./App.scss";
import Header from "./components/header/Header";
import Section1 from "./components/section-1/Section-1";
import Section2 from "./components/section-2/Section2";
import Loader from "./components/loader/Loader";
import Error from "./components/Error/Error";
import swal from "sweetalert";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      loading: true,
      quardinates: null,
      daily: null,
      currently: null,
      address: null,
      offset: null,
      locations: null,
      error: false,
    };
  }
  componentDidMount() {
    this.getCordinates("New delhi", false);
  }

  getCordinates = async (query, key) => {
    let results;
    let locations = [];
    this.setState({ locations });
    try {
      results = await axios.get(
        `https://dev.virtualearth.net/REST/v1/Locations?q=${query}&output=json&key=${process.env.REACT_APP_BINGMAP_KEY}`
      );

      if (results) {
        this.setState({ results });
        locations = results.data.resourceSets[0].resources;
        this.setState({ locations });
        if (key === "Enter" || this.state.loading === true) {
          const quardinates =
            results.data.resourceSets[0].resources[0].geocodePoints[0]
              .coordinates;
          this.setState({ quardinates });
          this.getWeatherData(true, quardinates);
        }
      }
    } catch (e) {
      swal({
        title: "Oops",
        text: "We are unable to locate this location.",
        icon: "error",
        button: "Try Again",
      });
    }
  };

  setCordinates = (quardinates, address) => {
    this.setState({ quardinates });

    this.getWeatherData(false, quardinates);
    this.setState({ address });
  };

  getWeatherData = async (change, quardinates) => {
    this.setState({ loading: true });
    try {
      const Data = await axios(
        `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${quardinates[0]},${quardinates[1]}?units=ca`
      );
      const daily = Data.data.daily.data;
      const currently = Data.data.currently;
      const offset = Data.data.offset;

      if (change) {
        const address = this.state.results.data.resourceSets[0].resources[0]
          .address.formattedAddress;
        this.setState({ address });
      }

      this.setState({ daily });
      this.setState({ currently });
      this.setState({ offset });
      this.setState({ loading: false });
    } catch (e) {
      swal({
        title: "Oops",
        text: "Something went wrong please try again.",
        icon: "error",
        button: "Try Again",
      });
    }
  };

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <React.Fragment>
        <div className="App">
          <div className="App__head">
            <Header />
          </div>
          <div className="App__Section">
            <div className="App__Section--1">
              {!this.state.loading && (
                <Section1
                  cordinatesFun={this.getCordinates}
                  cordinates={this.state.quardinates}
                  address={this.state.locations}
                  setCordinates={this.setCordinates}
                />
              )}
            </div>
            <div className="App__Section--2">
              {!this.state.loading && (
                <Section2
                  current={this.state.currently}
                  daily={this.state.daily}
                  address={this.state.address}
                  offset={this.state.offset}
                />
              )}
            </div>
          </div>
        </div>
        <div className="error">
          <Error />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
