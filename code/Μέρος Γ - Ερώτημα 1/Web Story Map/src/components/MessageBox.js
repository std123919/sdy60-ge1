import React, {Component} from 'react';
import trim from 'trim';
import {Segment,TextArea,Form,Field} from 'semantic-ui-react'

class MessageBox extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.state = {
      message: ''
    };
  }
  onChange(e){
      this.setState({
        message: e.target.value
      });
  }
  onKeyup(e){
    if(e.keyCode === 13 && trim(e.target.value) !== ''){
      e.preventDefault();
      let dbCon = this.props.db.database().ref('/messages');
      dbCon.push({
        message: trim(e.target.value)
      });
      this.setState({
        message: ''
      });
    }
  }
  render() {
    return (
      <Segment>
      <Form>
      <Form.Field>
        <TextArea
            
            placeholder="Type a message"
            
            onChange={this.onChange}
            onKeyUp={this.onKeyup}
            value={this.state.message}>
          </TextArea>
          </Form.Field>
      </Form>
      </Segment>
    )
  }
}

export default MessageBox
