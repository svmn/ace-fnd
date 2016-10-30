'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import PlaylistIcon from 'material-ui/svg-icons/av/queue-music';
import Menu from '../components/menu';
import { ignoreClear } from '../actions/chat';

class Header extends Component {
  render() {
    const { topic, online } = this.props;
    return (
      <AppBar
        title={null}
        iconElementLeft={
          <IconButton className='playlist-mode-switch' onTouchTap={this.props.togglePlaylistMode}>
            <PlaylistIcon />
          </IconButton>
        }
        iconElementRight={
          <Menu setTheme={this.props.setTheme} theme={this.props.theme} ignoreClear={this.props.ignoreClear} />
        }
        iconStyleRight={{
          // android < 4.4 fix
          position: 'absolute',
          right: '16px'
        }}
        className='header'
      >
        <div className='topic'>Tuzach development version 0.1.0</div>
        <div className='online'>
          Онлайн: {online}
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
  setTheme: PropTypes.func.isRequired,
  ignoreClear: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { topic, onlineCounter } = state;
  const { online, speed } = onlineCounter;
  return { topic, online, speed };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ ignoreClear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
