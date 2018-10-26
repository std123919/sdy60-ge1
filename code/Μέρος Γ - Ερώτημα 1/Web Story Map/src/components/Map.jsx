import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map as GMap, Marker } from 'google-maps-react';
import {Header, Image } from 'semantic-ui-react'

//const AnyReactComponent = ({ text }) => <div>{text}</div>;


class Map extends Component {


    constructor(props) {
        super(props);

      


        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            //markers: this.props.markers,
            show: false
        }
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
    }

     



    show() {
        this.setState({ show: true })
    }

    close() {
        this.setState({ show: false })
    }



    onMarkerClick = (props, marker, e) => {

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
         
        });
    }

    onMapClick = (t, map, coord) => {
        //this.setState({show:true})
        
        
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.props.onMapClickMaster(lat,lng);

        console.log(lat);

        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }


    

    render() {

        const {markers}=this.props;
        const {isGeolocationAvailable,isGeolocationEnabled,coords}=this.props;

        // if( coords) {
        //     alert(coords.latitude);
        // }

         

        const style = {
            width: '100%',
            height: '100vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }

        
        return (
                
           

                 <div>
          
                 {isGeolocationAvailable && isGeolocationEnabled && coords &&    
                <GMap
                    item
                    xs={12}
                    style={style}
                    google={this.props.google}
                    onClick={this.onMapClick}
                    zoom={10}
                    //initialCenter={{ lat: 39.648209, lng: -75.711185 }}
                    initialCenter={{ lat: coords.latitude, lng: coords.longitude }}
                    center={this.props.center}
                >

                    {markers.map(marker => (
                        
                        <Marker
                            position={{ lat: marker.lat, lng: marker.lng }}
                            key={marker.key}
                            onClick={this.onMarkerClick}
                            title={marker.title}
                            info={
                                <div>
                                    <Header>{marker.description}</Header>
                                    <Image src={marker.imageurl} size='small' centered></Image>
                                </div>}
                        />
                    ))}


                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>{this.state.activeMarker && this.state.activeMarker.info} </div>
                    </InfoWindow>
                </GMap>
                 }
                </div>
        )
    }
}

export default GoogleApiWrapper({
    api: ('AIzaSyDvAiSWUVcWcAfIYtbI-VUNlckq8ZUXlJ0')
})(Map)
