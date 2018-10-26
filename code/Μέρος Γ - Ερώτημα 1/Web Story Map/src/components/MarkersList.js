import React, { Component } from 'react';
import MarkerListItem from './MarkerListItem';
import _ from 'lodash';

class MarkersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
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

  render() {
    const {onMarkerDeleted,onMarkerListItemSelected}=this.props;
    let markerNodes = this.state.markers.map((marker) => {
      return (
       
          <MarkerListItem key={marker.key} data={marker} onMarkerDeleted={onMarkerDeleted} onMarkerListItemSelected={onMarkerListItemSelected}/>
       

      )
    });
    return (
      <div style={{ "overflowY": 'scroll', "height": "580px" }}>
        {/* <Segment> */}
        {markerNodes}
        {/* </Segment> */}
      </div>

    );
  }
}

export default MarkersList
