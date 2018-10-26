import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MarkersList from './MarkersList'
import NewMarker from './NewMarker'
import Map from './Map'
import _ from 'lodash';
import {geolocated} from 'react-geolocated';


// const markersAll = [{
//     id: 1,
//     latitude: 39.648209,
//     longitude: -35.711185,
//     data: 'marker 1'
// },
// {
//     id: 2,
//     latitude: 39.6482,
//     longitude: -75.7111,
//     data: 'marker 2'
// }]


class Dashboard extends Component {


    state = {
        markers: [],
        lat: '',
        lng: '',
        center: { lat: 39.648209, lng: -75.711185 }
    };

    componentWillMount() {


        let app = this.props.db.database().ref('markers');
        app.on('value', snapshot => {
            this.getData(snapshot.val());
        });

    }
   
    getData(values) {
        let markersVal = values;
        let markers = _(markersVal)
            .keys()
            .map(markerKey => {
                let cloned = _.clone(markersVal[markerKey]);
                cloned.key = markerKey;
                return cloned;
            })
            .value();

        this.setState({
            markers: markers
        });
    }



    onMapClickMaster = (lat, lng) => {


        this.setState({
            lat: lat,
            lng: lng
        })
    }

    clearLatLng = () => {
        this.setState({
            lat: '',
            lng: ''
        })
    }


    onNewMarkerAdded = (lat, lng, title, description, imageurl) => {

        //const id = cuid();
        //markersAll.push({ id: id, latitude: lat, longitude: lng, data: title })


        let dbCon = this.props.db.database().ref('/markers');
        dbCon.push(
            { title, description, imageurl, lat, lng }
        );


    }


    onMarkerDeleted = (key) => {


        let dbCon = this.props.db.database().ref('/markers');

        dbCon.child(`${key}`).remove();



    }


    onMarkerListItemSelected = (lat,lng) => {
         

        this.setState({
            center: {lat:lat,lng: lng}
        })

    }




    render() {
        const { markers, center } = this.state;

        const {isGeolocationAvailable,isGeolocationEnabled,coords}=this.props;
        // if(this.props.coords) {
        //     alert(this.props.coords.latitude);
        // }

        //alert(coords.latitude);
        return (

            <Grid >

                <Grid.Column width={12}>
                    <Map onMapClickMaster={this.onMapClickMaster} markers={markers} center={center} 
                    isGeolocationAvailable={isGeolocationAvailable}
                    isGeolocationEnabled={isGeolocationEnabled}
                    coords={coords}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <NewMarker db={this.props.db} lat={this.state.lat} lng={this.state.lng}
                        clearLatLng={this.clearLatLng}
                        onNewMarkerAdded={this.onNewMarkerAdded}
                    />
                    <MarkersList db={this.props.db} onMarkerDeleted={this.onMarkerDeleted} onMarkerListItemSelected={this.onMarkerListItemSelected}/>
                </Grid.Column>


            </Grid>


        )
    }
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  }) (Dashboard)
