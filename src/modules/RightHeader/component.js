'use strict';

import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import PlaylistIcon from 'material-ui/svg-icons/av/queue-music';
import { Component as HeaderMenu } from '../HeaderMenu';

export default class RightHeader extends Component {
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
          <HeaderMenu setTheme={this.props.setTheme} theme={this.props.theme} ignoreClear={this.props.ignoreClear} />
        }
        className='header'
      >
        <div className='topic'>{topic}</div>
        <div className='online'>
          Онлайн: {online}
        </div>
      </AppBar>
    );
  }
}

RightHeader.propTypes = {
  topic: PropTypes.string.isRequired,
  online: PropTypes.string.isRequired,
  speed: PropTypes.any,
  togglePlaylistMode: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  ignoreClear: PropTypes.func.isRequired
};
