import React, { useState } from "react";
import "./Section-1.scss";
import Mapbox from "../mapbox/mapbox";

const Section1 = React.memo((props) => {
  const [input, setinput] = useState();
  let address;
  let timeout = null;

  const doSearch = (evt, key) => {
    let searchText = evt.target.value;

    if (!searchText) {
      if (input) {
        setinput(false);
      }
      return;
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      props.cordinatesFun(searchText, key);
      if (!input) {
        setTimeout(() => {
          setinput(true);
        }, 800);
      }
    }, 800);
  };

  input
    ? (address = props.address.map((e, i) => {
        return (
          <li
            key={i}
            className="address"
            onClick={() =>
              props.setCordinates(
                e.geocodePoints[0].coordinates,
                e.address.formattedAddress
              )
            }
          >
            {e.name}
          </li>
        );
      }))
    : (address = null);

  return (
    <section className="searchAndMap">
      <div className="searchAndMap__text">
        <span className="searchAndMap__text--head">
          CHECK LIVE LOCATION WEATHER OF 24/7 HOURS.
        </span>
        <span className="searchAndMap__text--head--Info">
          Weather forcasting is the application of science and technology to
          predict the atmosphere for a given location and time
        </span>
      </div>
      <div className="searchAndMap__input">
        <input
          className="inputVal"
          type="text"
          placeholder="&#xf002; City, Place, Country, Pin Code "
          onKeyUpCapture={(e) => doSearch(e, e.key)}
        />
        {/* <div className="searchAndMap__address">
          <ul>{props.address.length !== NaN && address}</ul>
        </div> */}
      </div>
      <div className="searchAndMap__mapbox">
        
        <Mapbox cordinates={[props.cordinates.lat, props.cordinates.lon]} key={props.cordinates[0]} />
      </div>
    </section>
  );
});

export default Section1;
