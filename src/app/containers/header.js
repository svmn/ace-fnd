'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <div className='top'>Header</div>
    );
  }
}

const mapStatetoProps = (state) => {
  const { chat, topic } = state;
  const { online } = chat;
  return { topic, online };
};

export default connect(mapStatetoProps)(Header);
