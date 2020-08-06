import React from "react";
import "./Card.scss";
import { CSSTransition } from "react-transition-group";
import Icons from "../icons/icons";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }
  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  TempCalc = (temp) => {
    if (temp === 0) return temp;
    if (temp === 1) return 100;
    if (temp.toString().split(".")[1].toString().length < 2) {
      return temp.toString().split(".")[1] + 0;
    }
    return Math.round(temp.toString().split(".")[1]);
  };
  render() {
    const iconjsx = <Icons weIcon={this.props.data.icon} />;
    return (
      <div className="Card" key={this.props.keys}>
        <div onClick={(e) => this.togglePanel(e)} className="header">
          {/* {this.props.title} <span>Hello World</span> */}
          <div className="Card__header">
            <div className="Card__header--data">
              <div className="Card__header--data-svg">
                <div className="Card__header--data-svg-icon">{iconjsx}</div>
              </div>
              <div className="Card__header--data-date">
                <span>
                  {this.props.Time(
                    this.props.data.time,
                    this.props.offset,
                    true
                  )}
                </span>
              </div>
              <div className="Card__header--data-temp">
                <span>{Math.round(this.props.data.temperatureMax)}&#176;</span>
                &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  width="10px"
                  height="17px"
                  viewBox="0 0 75.32 122.88"
                  fill="white"
                >
                  <style type="text/css"></style>
                  <g>
                    <polygon
                      class="st0"
                      points="37.66,0 0,37.99 24.24,37.99 24.24,122.88 51.08,122.88 51.08,37.99 75.32,37.99 37.66,0"
                    />
                  </g>
                </svg>
              </div>
              <div className="Card__header--data-humi">
                <span>Humidity {this.TempCalc(this.props.data.humidity)}%</span>
              </div>
            </div>
          </div>
        </div>
        {
          <CSSTransition
            in={this.state.open}
            timeout={350}
            classNames="display"
            unmountOnExit
          >
            <div className="Card__content">
              <div className="Card__content--temp">
                <div className="Card__content--temp--min">
                  <span>
                    Min {Math.round(this.props.data.temperatureMin)}&#176;
                  </span>
                  <h5>
                    {this.props.Time(
                      this.props.data.temperatureMinTime,
                      this.props.offset
                    )}
                  </h5>
                </div>
                <div className="Card__content--temp--max">
                  <span>
                    Max {Math.round(this.props.data.temperatureMax)}&#176;
                  </span>
                  <h5>
                    {this.props.Time(
                      this.props.data.temperatureMaxTime,
                      this.props.offset
                    )}
                  </h5>
                </div>
              </div>
              <div className="Card__content--info">
                <div className="Card__content--info--weather">
                  <div className="Card__content--info--weather-icon">
                    {iconjsx}
                  </div>
                  <span>{this.props.data.summary}</span>
                </div>
                <div className="Card__content--info--sun">
                  <div className="Card__content--info--sun--sunrise">
                    <img
                      src={require("../../assets/icons/dawn.png")}
                      alt="Svg"
                    />
                    <span>
                      {this.props.Time(
                        this.props.data.sunriseTime,
                        this.props.offset
                      )}
                    </span>
                  </div>
                  <div className="Card__content--info--sun--sunset">
                    <img
                      src={require("../../assets/icons/sunset.png")}
                      alt="Svg"
                    />
                    <span>
                      {this.props.Time(
                        this.props.data.sunsetTime,
                        this.props.offset
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="Card__content--data">
                <ul>
                  <li>
                    DewPoint &nbsp; &nbsp;{" "}
                    {Math.round(this.props.data.dewPoint)}
                    &#176;
                  </li>
                  <li>
                    Humidity &nbsp; &nbsp;{" "}
                    {this.TempCalc(this.props.data.humidity)}%
                  </li>
                  <li>
                    Wind Speed {Math.round(this.props.data.windSpeed)}KM/h
                  </li>
                  <li>
                    Preciption &nbsp;{" "}
                    {this.TempCalc(this.props.data.precipProbability)}%
                  </li>
                  <li>
                    Pressure &nbsp;&nbsp;&nbsp;{" "}
                    {Math.round(this.props.data.pressure)}ps
                  </li>
                  <li>
                    Visibility &nbsp; &nbsp;{" "}
                    {Math.round(this.props.data.visibility)}Km
                  </li>
                </ul>
              </div>
            </div>
          </CSSTransition>
        }
      </div>
    );
  }
}
export default Card;
