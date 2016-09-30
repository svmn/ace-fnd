'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Menu from '../components/menu';
import IconButton from 'material-ui/IconButton';
import PlaylistIcon from 'material-ui/svg-icons/av/queue-music';

class Header extends Component {
  render() {
    const { topic, online } = this.props;
    return (
      <AppBar
        title={null}
        iconElementLeft={
          <IconButton className='playlist-mode-switch' onTouchTap={this.props.togglePlaylistMode}><PlaylistIcon /></IconButton>
        }
        iconElementRight={<Menu />}
        className='header'
      >
        <div className='topic'>Tuzach development version 0.0.1</div>
        <div className='online'>Онлайн: {online}</div>
      </AppBar>
    );
  }
}

Header.propTypes = {
  online: PropTypes.any,
  togglePlaylistMode: PropTypes.func.isRequired
};

const mapStatetoProps = (state) => {
  const { chat, topic } = state;
  const { online } = chat;
  return { topic, online };
};

export default connect(mapStatetoProps)(Header);
