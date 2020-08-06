import React from "react";
import mapboxgl from "mapbox-gl";
import "./mapbox.scss";

class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.cordinates[1],
      lat: this.props.cordinates[0],
      zoom: 7,
    };
  }

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2Fta3VtYXIiLCJhIjoiY2syMzRrMnRpMGplZDNtbXpqN2lqbjdkcyJ9.31_i-8wD9Vs7SkBjNJFVHg";
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.props.cordinates[1], this.props.cordinates[0]],
      zoom: this.state.zoom,
    });
  }

  render() {
    return (
      <div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default Mapbox;
