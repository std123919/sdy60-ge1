import React, { Component } from 'react';
import { Image,Header,Segment ,Button} from 'semantic-ui-react'

class MarkerListItem extends Component {

  o 

  render() {
    const {title,imageurl,description,key,lat,lng}=this.props.data;
    const {onMarkerDeleted,onMarkerListItemSelected}=this.props;
    
    return (
      <Segment>
        <Header>{title}</Header>
        <Image src={imageurl} size='medium' centered/>
        {description}
        <br></br>
        <Button size="small" positive floated="left" onClick={() => onMarkerListItemSelected(lat,lng)}>Go to Marker</Button>
        <Button size="small" negative floated="right" onClick={() => onMarkerDeleted(key)}>Remove marker</Button>
        <br></br>
        <br></br>
      </Segment>
    )
  }
}
export default MarkerListItem
