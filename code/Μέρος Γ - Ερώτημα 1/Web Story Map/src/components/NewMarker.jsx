import React, { Component } from "react";
import {
  Header,
  Form,
  Segment,
  Button,
  Loader,
  Dimmer
} from "semantic-ui-react";
import FileUploader from "react-firebase-file-uploader";

class NewMarker extends Component {
  state = {
    title: "",
    imageurl: "",
    description: "test description",
    isUploading: false,
    progress: 0
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async e => {
    e.preventDefault();

    const { title, description, imageurl } = this.state;
    const { lat, lng } = this.props;

    // Clear State
    this.setState({
      title: "",
      imageurl: "",
      description: ""
    });
    this.props.clearLatLng();

    this.props.onNewMarkerAdded(lat, lng, title, description, imageurl);
  };

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 });
  };
  handleProgress = progress => {
    this.setState({ progress });
  };

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
    alert("ERROR UPLOADING IMAGE");
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    this.props.db
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ imageurl: url });
      });
  };

  render() {
    const { title, description, imageurl, isUploading  } = this.state;
    const { lat, lng, db } = this.props;

    return (
      <Segment>
        <Header>Add New Marker Infomation</Header>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Form.Field>
            <input
              placeholder="Title"
              value={title}
              name="title"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            {imageurl && (
              <input
                placeholder="Image Url"
                value={imageurl}
                name="imageurl"
                onChange={this.onChange}
              />
            )}
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Description"
              value={description}
              name="description"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="lat"
              value={lat}
              name="lat"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="lng"
              value={lng}
              name="lng"
              onChange={this.onChange}
            />
          </Form.Field>

          {!imageurl &&
            !isUploading && (
              <div>
                <label
                  style={{
                    backgroundColor: "steelblue",
                    color: "white",
                    padding: 10,
                    borderRadius: 4,
                    pointer: "cursor"
                  }}
                >
                  Select you photo
                  <FileUploader
                    hidden
                    accept="image/*"
                    storageRef={db.storage().ref("images")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </label>
                <br />
                <br />
              </div>
            )}
          {isUploading && (
            <Segment>
              <Dimmer active inverted>
                <Loader size="mini"></Loader>
              </Dimmer>
            </Segment>
          )}

          <Button
            type="submit"
            disabled={!title || !description || !imageurl || !lat || !lng}
          >
            Add Marker
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default NewMarker;
