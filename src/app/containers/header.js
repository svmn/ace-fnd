'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../components/menu';

class Header extends Component {
  render() {
    const { topic, online } = this.props;
    return (
      <div className='top header'>
        <Menu />
        <div className='topic'>Tuzach development version 0.0.1</div>
        <div className='online'>Онлайн: {online}</div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  const { chat, topic } = state;
  const { online } = chat;
  return { topic, online };
};

export default connect(mapStatetoProps)(Header);
