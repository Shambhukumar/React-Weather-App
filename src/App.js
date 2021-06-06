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
      CurrentData: null,
      currently: null,
      hourly: null,
      address: null,
      offset: null,
      locations: null,
      error: false,
    };
  }
  componentDidMount() {
  this.getWeatherData()

    // this.getCordinates("New delhi", false);
  }

  // getCordinates = async (query, key) => {
  //   let results;
  //   let locations = [];
  //   this.setState({ locations });
  //   try {
  //     results = await axios.get(
  //       `https://dev.virtualearth.net/REST/v1/Locations?q=${query}&output=json&key=AtrQToJAENomvHwO3jzdgpvoATjElgF2ITUt6TMgIWsJUqQfCHKMcMVRxRvQyMpm`
  //     );

  //     if (results) {
  //       this.setState({ results });
  //       locations = results.data.resourceSets[0].resources;
  //       this.setState({ locations });
  //       if (key === "Enter" || this.state.loading === true) {
  //         const quardinates =
  //           results.data.resourceSets[0].resources[0].geocodePoints[0]
  //             .coordinates;
  //         this.setState({ quardinates });
  //         this.getWeatherData(true, quardinates);
  //       }
  //     }
  //   } catch (e) {
  //     swal({
  //       title: "Oops",
  //       text: "We are unable to locate this location.",
  //       icon: "error",
  //       button: "Try Again",
  //     });
  //   }
  // };

  // setCordinates = (quardinates, address) => {
  //   this.setState({ quardinates });

  //   this.getWeatherData(false, quardinates);
  //   this.setState({ address });
  // };

  getWeatherData = async (change, quardinates) => {
    this.setState({ loading: true });
    try {
      const Data = await axios(
        
        `http://api.openweathermap.org/data/2.5/forecast?q=New%20delhi&units=metric&appid=e1303a5d026677bc510f2c3948b0a789
        `
      );
      const Current = await axios(
        
        `http://api.openweathermap.org/data/2.5/weather?q=New%20delhi&units=metric&appid=e1303a5d026677bc510f2c3948b0a789
        `
      );
      // console.log(Current)
      const CurrentData = Current.data
      const hourly = Data.data;
      // const currently = Data.data.currently;
      // const offset = Data.data.offset;

      // if (change) {
      //   const address = this.state.results.data.resourceSets[0].resources[0]
      //     .address.formattedAddress;
      //   this.setState({ address });
      // }
        // console.log(Data)
      this.setState({ CurrentData });
      this.setState({hourly})
      // console.log(hourly)
      // this.setState({ currently });
      // this.setState({ offset });
      this.setState({ loading: false });
    } catch (e) {
      console.log(e)
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
                  // cordinatesFun={this.getCordinates}
                  cordinates={this.state.CurrentData.coord}
                  address={this.state.name}
                  // setCordinates={this.setCordinates}
                />
              )}
            </div>
            
            <div className="App__Section--2">
              {!this.state.loading && (
                <Section2
                  current={this.state.currently}
                  CurrentData={this.state.CurrentData}
                  address={this.state.address}
                  offset={this.state.offset}
                  hourly={this.state.hourly}
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
