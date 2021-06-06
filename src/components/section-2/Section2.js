import React from "react";
import "./Section2.scss";

import Card from "../card/Card";
import Icons from "../icons/icons";

const Section2 = (props) => {
  console.log(props.CurrentData)
  const  {name, dt} = props.CurrentData
  const {humidity, temp, feels_like} = props.CurrentData.main
  const {description} = props.CurrentData.weather[0]
  const {speed} = props.CurrentData.wind
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

  console.log(props.hourly)

  const dailyData=[];
  let today = [];
    props.hourly.list.map((item, i) => {
      const day =  item.dt_txt.split(" ");
      if(i === 0){
        today.push(item)
      }
      else if(i > 0 && props.hourly.list[--i].dt_txt.split(" ")[0] === day[0]){
        today.push(item)
      }
      else{
        dailyData.push({date : today[0].dt_txt, data: today}) 
        today = [];
       
      }
    });
    console.log(dailyData)

  const cardJsx = dailyData.map((e, i) => {
    return <Card data={e.data} date={e.date} key={i} Time={Time} offset={props.offset} />;
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
            {name}
          </span>
        </div>
        <div className="dataAndInfo__current--data">
          <div className="dataAndInfo__current--data--icon">
            <div className="dataAndInfo__current--data--icon-svg">
             <Icons />
            </div>
             <h3
              // style={
              //   props.current.summary.split(" ").length > 2
              //     ? { fontSize: "0.9rem" }
              //     : { fontSize: "1rem" }
              // }
            >
              {description}
            </h3>
          </div>
          <ul className="dataAndInfo__current--data--info">
             <li className="dataAndInfo__current--data--info-date">
              {Time(dt, props.offset, true)}
            </li>
           
            <li className="dataAndInfo__current--data--info-preciption">
               Preciption {props.CurrentData.clouds.all}% 
            </li>
            <li className="dataAndInfo__current--data--info-humidity">
               Humidity {humidity}% 
            </li>
            <li className="dataAndInfo__current--data--info-wind">
                Wind {speed} km/h 
            </li> 
          </ul>
          <div className="dataAndInfo__current--data-temp">
            <div>
              <span>{Math.round(temp)}&#176;</span>
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
              Feels Like {Math.round(feels_like)}&#176;
            </h3>
          </div>
        </div>
      </div>
      <div className="dataAndInfo__Cards">{cardJsx}</div>
    </div>
  );
};

export default Section2;
