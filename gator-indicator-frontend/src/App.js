import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import axios from 'axios';
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


const busIcon = {
  url: 'https://cdn0.iconfinder.com/data/icons/geo-points/154/bus-24.png'
}

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDpsOhFlgGnO7lyW5Nn-obvTWrTVxfQIMI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 29.648403, lng: -82.360650 }}
  >

    {props.stops.map((stop, index) => {
      return <Marker
        key={index}
        position={{ lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude) }}
        icon={busIcon}
        onClick={() => props.markerClicked(stop.stop_id)}
        clickable={true}
      >
        {stop.showInfo &&
          <InfoBox
          onCloseClick={props.markerClicked(stop.stop_id)}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
              Hello, Kaohsiung!
            </div>
          </div>
        </InfoBox>
        }
      </Marker>
    })}

  </GoogleMap>
)

export default class MyFancyComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stops: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/get-all-stops')
      .then(res => {
        let stops = res.data.map(el => {
          var stop = Object.assign({}, el);
          stop.showInfo = true
          return stop;
        });
        this.setState({ stops: stops.slice(0,1) })
      })
      this.forceUpdate();
  }

  markerClicked = (stop_id) => {
    let stops = this.state.stops;
    let indexOfStop = stops.findIndex(stop => stop.stop_id === stop_id);

    stops[indexOfStop].showInfo = !stops[indexOfStop].showInfo;
    console.log(stops[indexOfStop].showInfo);
    this.setState({ stops });
  }

  render() {
    return (
      <MyMapComponent
        stops={this.state.stops}
        markerClicked={this.markerClicked}
      />
    )
  }
}