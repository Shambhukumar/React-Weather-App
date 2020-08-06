import React from "react";
import "./Section2.scss";

import Card from "../card/Card";
import Icons from "../icons/icons";

const Section2 = (props) => {
  const val = false;
  const Time = (time, offset, val) => {
    const d = new Date(time * 1000);
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const nd = new Date(utc + 3600000 * offset);
    if (val) {
      let date2 = nd.toDateString().split(" ").reverse();
      date2.shift();
      date2 = date2.join(" ");
      return date2;
    }

    return nd.toLocaleString().split(",")[1];
  };

  const cardJsx = props.daily.map((e, i) => {
    return <Card data={e} key={i} Time={Time} offset={props.offset} />;
  });
  const TempCalc = (temp) => {
    if (temp === 0) return temp;
    if (temp === 1) return 100;
    if (temp.toString().split(".")[1].toString().length < 2) {
      return temp.toString().split(".")[1] + 0;
    }
    return Math.round(temp.toString().split(".")[1]);
  };

  return (
    <div className="dataAndInfo">
      <div className="dataAndInfo__current">
        <div className="dataAndInfo__current--location">
          <span>
            {props.address.split(" ").length < 4
              ? props.address
              : props.address.split(" ").splice(0, 3).join(" ") + "..."}
          </span>
        </div>
        <div className="dataAndInfo__current--data">
          <div className="dataAndInfo__current--data--icon">
            <div className="dataAndInfo__current--data--icon-svg">
              <Icons weIcon={props.current.icon} />
            </div>
            <h3
              style={
                props.current.summary.split(" ").length > 2
                  ? { fontSize: "0.9rem" }
                  : { fontSize: "1rem" }
              }
            >
              {props.current.summary}
            </h3>
          </div>
          <ul className="dataAndInfo__current--data--info">
            <li className="dataAndInfo__current--data--info-date">
              {Time(props.current.time, props.offset, true)}
            </li>
            <li className="dataAndInfo__current--data--info-preciption">
              Preciption {TempCalc(props.current.precipProbability)}%
            </li>
            <li className="dataAndInfo__current--data--info-humidity">
              Humidity {TempCalc(props.current.humidity)}%
            </li>
            <li className="dataAndInfo__current--data--info-wind">
              Wind {Math.round(props.current.windSpeed)} km/h
            </li>
          </ul>
          <div className="dataAndInfo__current--data-temp">
            <div>
              <span>{Math.round(props.current.temperature)}&#176;</span>
              <p
                style={{
                  display: "inline-block",
                  fontSize: "3rem",
                  verticalAlign: "top",
                  paddingLeft: "10px",
                  paddingTop: "0.4rem",
                }}
              >
                C
              </p>
            </div>
            <h3>
              Feels Like {Math.round(props.current.apparentTemperature)}&#176;
            </h3>
          </div>
        </div>
      </div>
      <div className="dataAndInfo__Cards">{cardJsx}</div>
    </div>
  );
};

export default Section2;
