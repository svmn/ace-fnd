'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Menu from '../components/menu';
import IconButton from 'material-ui/IconButton';
import PlaylistIcon from 'material-ui/svg-icons/av/queue-music';

class Header extends Component {
  render() {
    const { topic, online, speed } = this.props;
    return (
      <AppBar
        title={null}
        iconElementLeft={
          <IconButton className='playlist-mode-switch' onTouchTap={this.props.togglePlaylistMode}>
            <PlaylistIcon />
          </IconButton>
        }
        iconElementRight={<Menu setTheme={this.props.setTheme} theme={this.props.theme} />}
        iconStyleRight={{
          // android < 4.4 fix
          position: 'absolute',
          right: '16px'
        }}
        className='header'
      >
        <div className='topic'>Tuzach development version 0.0.1</div>
        <div className='online'>
          <span>Онлайн: {online}</span>
          <span style={{ marginLeft: '15px' }}>Скорость постинга: {speed}</span>
        </div>
      </AppBar>
    );
  }
}

Header.propTypes = {
  online: PropTypes.any,
  speed: PropTypes.any,
  togglePlaylistMode: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired
};

const mapStatetoProps = (state) => {
  const { topic, onlineCounter } = state;
  const { online, speed } = onlineCounter;
  return { topic, online, speed };
};

export default connect(mapStatetoProps)(Header);
