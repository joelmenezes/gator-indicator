import React from "react";
import { Marker, withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap(props => {
    // let ref = {};
    const { onMapMounted, ...otherProps } = props;
    return <GoogleMap {...otherProps} ref={c => {
        onMapMounted && onMapMounted(c)
    }}>{props.children}</GoogleMap>
}))

export default class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { map: null };
    }
    mapLoaded(map) {
        //console.log('mapLoaded: ' + JSON.stringify(map.getCenter()))
        if (this.state.map !== null)
            return
        this.setState({ map: map })
    }

    mapMoved() {
        console.log('mapMoved: ' + JSON.stringify(this.state.map.getCenter()))
    }

    zoomChanged() {
        console.log(this.state.map.getZoom())
    }

    render() {
        

        return (
            <MyMapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpsOhFlgGnO7lyW5Nn-obvTWrTVxfQIMI&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `462px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                defaultZoom={3}
                defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
            >
                <Marker
                    position={{ lat: 25.039160, lng: 121.5251 }}
                />
            </MyMapComponent>
        )
    }
}