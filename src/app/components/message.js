'use strict';

import React, { Component, PropTypes } from 'react';
import { pad } from '../utils';
import Avatar from './avatar';

class Message extends Component {
  render() {
    const { message } = this.props;
    const time = new Date(message.time);
    const formattedTime = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
    return (
      <div className='message'>
        <div className='avatar'>
          <Avatar userId={message.user_id} />
        </div>
        <div className='right'>
          <div className='time'>{formattedTime}</div>
        </div>
        <div className='id'>#{message.id}</div>
        <div className='text'>{message.text}</div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
