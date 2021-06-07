import React from "react";
import "./Card.scss";
import Chart from "../chart/chart";
// import { CSSTransition } from "react-transition-group";
import Icons from "../icons/icons";
const Card = (props) => {
 

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

  const jsx = (data) =>{
    if(!data){
      data = props.data[0].data
    }
    console.log(data)
    const {temp_max, temp_min, humidity, pressure} = data[0].main
    const {visibility, pop} = data[0]
    const {speed} = data[0].wind
    const {description, icon} = data[0].weather
    
    return (
      <div className="Card__details__info">
        <div className="Card__details__info--chart">
          <Chart/>
        </div>
        <div className="Card__details__info--data">
          <ul>
            <li> Max {temp_max} </li>
            <li> Min {temp_min} </li>
            <li> Humidity {humidity}% </li>
            <li> Pressure {pressure} </li>
            <li> Wind Speed {speed} </li>
            <li> Probability {pop} </li>
            <li> Visibility {visibility} </li>
          </ul>
        </div>
      </div>
    )
  }
  
  
   


    const allDay = props.data.map((e,i)=>{
      const  {temp_max, temp_min} = e.data[0].main;
      const  {icon, description} = e.data[0].weather[0];
      const date = e.data[0].dt;
      return(
        <ul key={i}>
          <li>
            {Time(date, null, true)}
          </li>
          <li>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} className="Card__allDay--icon"/> 
          </li>
          <li>
            <span className="Card__allDay--max">{Math.ceil(temp_max)}&#176;</span>
            <span className="Card__allDay--min">{Math.floor(temp_min)}&#176;</span>
          </li>
          
        </ul>
      )
    })
    return (
      <div className="Card" key={props.keys}>

        
       {console.log(props.data)}
       <div className="Card__details">
        {jsx()}
       </div>
       <div className="Card__allDay">
       {allDay}
       </div>
         
      </div>
    );
  }

export default Card;


//  {/* <div onClick={(e) => togglePanel(e)} className="header">
//           <div className="Card__header">
//             <div className="Card__header--data">
//               <div className="Card__header--data-svg">
//                 <div className="Card__header--data-svg-icon">{iconjsx}</div>
//               </div>
//               <div className="Card__header--data-date">
//                 <span>
//                   {props.date.split(" ")[0]}
//                 </span>
//               </div>
//               <div className="Card__header--data-temp">
//                 <span>{Math.round(temp_max)}&#176;</span>
//                 &nbsp;
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   version="1.1"
//                   id="Layer_1"
//                   x="0px"
//                   y="0px"
//                   width="10px"
//                   height="17px"
//                   viewBox="0 0 75.32 122.88"
//                   fill="white"
//                 >
//                   <style type="text/css"></style>
//                   <g>
//                     <polygon
//                       class="st0"
//                       points="37.66,0 0,37.99 24.24,37.99 24.24,122.88 51.08,122.88 51.08,37.99 75.32,37.99 37.66,0"
//                     />
//                   </g>
//                 </svg>
//               </div>
//               <div className="Card__header--data-humi">
//                 <span>Humidity {humidity}%</span>
//               </div>
//             </div>
//           </div>
//         </div> */}
        
//           {/* <CSSTransition
//             in={state.open}
//             timeout={350}
//             classNames="display"
//             unmountOnExit
//           >
//             <div className="Card__content">
//               <div className="Card__content--temp">
//               </div>
//               <div className="Card__content--info">
//                 <div className="Card__content--info--weather">
//                   <div className="Card__content--info--weather-icon">
//                     {iconjsx}
//                   </div>
//                   <span>{props.data.summary}</span>
//                 </div>
//                 <div className="Card__content--info--sun">
//                   <div className="Card__content--info--sun--sunrise">
                  

//                   <span>
//                     Min {Math.round(temp_min)}&#176;
//                   </span>
//                   <h5>
//                     {props.Time(
//                       props.data.temperatureMinTime,
//                       props.offset
//                     )}
//                   </h5>




//                   </div>
//                   <div className="Card__content--info--sun--sunset">
//                   <span>
//                     Max {Math.round(temp_max)}&#176;
//                   </span>
//                   <h5>
//                     {props.Time(
//                       props.data.temperatureMaxTime,
//                       props.offset
//                     )}
//                   </h5>
//                   </div>
//                 </div>
//               </div>
//               <div className="Card__content--data">
//                 <ul>
//                   <li>
//                     Humidity &nbsp; &nbsp;{" "}
//                     {humidity}%
//                   </li>
//                   <li>
//                     Wind Speed {Math.round(speed)}KM/h
//                   </li>
//                   <li>
//                     Preciption &nbsp;{" "}
//                     {pop}%
//                   </li>
//                   <li>
//                     Pressure &nbsp;&nbsp;&nbsp;{" "}
//                     {pressure}ps
//                   </li>
//                   <li>
//                     Visibility &nbsp; &nbsp;{" "}
//                     {visibility}Km
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </CSSTransition> */}
