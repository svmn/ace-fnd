'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../components/menu';

class Header extends Component {
  render() {
    return (
      <div className='top main header'>
        <Menu />
        <div className='topic'>Tuzach development version 0.0.1</div>
        <div className='online'>Онлайн: 12</div>
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
