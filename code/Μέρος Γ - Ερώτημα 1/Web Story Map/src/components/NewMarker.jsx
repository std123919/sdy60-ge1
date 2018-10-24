import React, { Component } from 'react';
import { Header,Form, Segment, Input, Button } from 'semantic-ui-react';

class NewMarker extends Component {

    state = {
        title: '',
        imageurl: 'https://shop.fagron.gr/image/cache/data/incoming/productimage/Raw_Materials_Blank-280x280.jpg',
        description: 'test description' 
      };

      onChange = e => this.setState({ [e.target.name]: e.target.value });


      onSubmit = async (e) => {
        e.preventDefault();
   
        const { title,description,imageurl } = this.state;
        const {lat,lng}=this.props;
           
        // Clear State
        this.setState({
            title: '',
            imageurl: '',
            description: '' 
          });
          this.props.clearLatLng();

          this.props.onNewMarkerAdded(lat,lng,title,description,imageurl);
    
         
      };



    render() {
        const  {title,description,imageurl}=this.state;
        const {lat,lng } = this.props;
       
        return (
            
            <Segment> 
                <Header>Add New Marker Infomation</Header>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Form.Field>
                        <input placeholder='Title' value={title} name="title"  onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Image Url' value={imageurl} name="imageurl"  onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Description' value={description} name="description"  onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='lat' value={lat} name="lat"  onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='lng' value={lng} name="lng"  onChange={this.onChange}/>
                    </Form.Field>
                    <Button type='submit'>Add Marker</Button>
                </Form>
            </Segment>


        )
    }
}

export default NewMarker
