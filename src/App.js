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
      place: "New Delhi",
      error: false,
    };
  }
  componentDidMount() {
  this.getWeatherData()

  }


  getWeatherData = async (place) => {
    this.setState({ loading: true });
    if(!place){
      place = this.state.place
    }
    try {
      const Data = await axios(
        
        `http://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=e1303a5d026677bc510f2c3948b0a789
        `
      );
      const Current = await axios(
        
        `http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=e1303a5d026677bc510f2c3948b0a789
        `
      );
      const CurrentData = Current.data
      const hourly = Data.data;
      this.setState({ CurrentData });
      this.setState({hourly})
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

  changePlace = (place)=>{
    this.getWeatherData(place)
  }

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
                  cordinates={this.state.CurrentData.coord}
                  address={this.state.name}
                  newPlace={this.changePlace}
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
