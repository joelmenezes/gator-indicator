import React from "react";
import { Marker, withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import axios from 'axios';
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const MyMapComponent = withScriptjs(withGoogleMap(props => {
	const { onMapMounted, ...otherProps } = props;
	return <GoogleMap {...otherProps} ref={c => {
		onMapMounted && onMapMounted(c)
	}}>{props.children}</GoogleMap>
}))

const busIcon = {
	url: 'https://www.realestate-valdeurope.com/wp-content/themes/red/images/marker/icon-bus.png'
}
export default class MapComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			map: null,
			stops: []
		};
	}

	componentDidMount() {
		axios.get('http://localhost:5000/get-all-stops')
			.then(res => {
				let stops = res.data.map(el => {
					var stop = Object.assign({}, el);
					stop.showInfo = false
					return stop;
				});
				this.setState({ stops })
			})
	}
	mapLoaded(map) {
		if (this.state.map !== null) return;
		this.setState({ map: map })
	}

	markerClicked = (stop_id) => {
		let stops = this.state.stops;
		let indexOfStop = stops.findIndex(stop => stop.stop_id === stop_id);

		stops[indexOfStop].showInfo = !stops[indexOfStop].showInfo;
		this.setState({ stops });
	}
	render() {
		let stops = this.state.stops;
		return (
			<MyMapComponent
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpsOhFlgGnO7lyW5Nn-obvTWrTVxfQIMI&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `462px` }} />}
				mapElement={<div style={{ height: `100%` }} />} defaultZoom={14}
				defaultCenter={{ lat: 29.648403, lng: -82.360650 }}
			>
				{stops.map((stop, index) => {
					return <Marker
						key={index}
						position={{ lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude) }}
						icon={busIcon}
						onClick={() => this.markerClicked(stop.stop_id)}
						clickable={true}
					>
						{stop.showInfo &&
							<InfoBox
								options={{ closeBoxURL: ``, enableEventPropagation: true }}
							>
								<div style={{
									backgroundColor: `white`, padding: `12px`, top: 9,
									left: 15,
									width: 203
								}}>
									<div style={{ fontSize: `12px`, fontColor: `#08233B` }}>
										{stop.name}
										<br />
										{stop.routes}
									</div>
								</div>
							</InfoBox>
						}
					</Marker>
				})}
			</MyMapComponent>
		)
	}
}