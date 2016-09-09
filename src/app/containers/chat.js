'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chat extends Component {
  render() {
    return (
      <div>Chat</div>
    );
  }
}

const mapStatetoProps = (state) => {
  const { messages, replies, ignoreList } = state.chat;
  return { messages, replies, ignoreList };
};

export default connect(mapStatetoProps)(Chat);
