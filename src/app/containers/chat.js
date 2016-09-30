'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import Message from '../components/message';

class Chat extends Component {
  render() {
    const { messages } = this.props;
    return (
      <div className='middle chat'>
        <Scrollbars autoHide className='scrollbar-container' >
          {
            messages.map(msg => <Message message={msg} key={msg.id} />)
          }
        </Scrollbars>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired
};

const mapStatetoProps = (state) => {
  const { messages, replies, ignoreList } = state.chat;
  return { messages, replies, ignoreList };
};

export default connect(mapStatetoProps)(Chat);
