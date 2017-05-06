'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { Component as HeaderMenu } from '../HeaderMenu';

export default class RightHeader extends Component {
  render() {
    const { topic, online } = this.props;
    return (
      <AppBar
        className='right-header'
        title={null}
        iconElementLeft={
          <IconButton
            className='playlist-mode-switch'
            iconClassName='material-icons'
            onTouchTap={this.props.togglePlaylistMode}
          >queue_music</IconButton>
        }
        iconElementRight={
          <HeaderMenu setTheme={this.props.setTheme} theme={this.props.theme} ignoreClear={this.props.ignoreClear} />
        }
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
  togglePlaylistMode: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  ignoreClear: PropTypes.func.isRequired
};
