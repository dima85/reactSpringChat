import React from 'react';
import './Message.css'
import Moment from 'react-moment';

class Message extends React.Component {
    render() {
      return (
        <div className={this.props.my ? "message my" : "message"}>
          <div className="message-author">{this.props.my ? 'You' : this.props.author}</div>
          <div className="message-text">{this.props.text}</div>
          <div className="message-author">
              <Moment format="DD MMM YYYY hh:mm" date={this.props.created} />
          </div>          
        </div>
      );
    }
  }

  export default Message;