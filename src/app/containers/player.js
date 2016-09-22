'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import ForwardIcon from 'material-ui/svg-icons/av/fast-forward';
import RewindIcon from 'material-ui/svg-icons/av/fast-rewind';
import MuteIcon from 'material-ui/svg-icons/av/volume-off';
import VolumeIcon from 'material-ui/svg-icons/av/volume-up';
import RepeatIcon from 'material-ui/svg-icons/av/repeat';
import ShuffleIcon from 'material-ui/svg-icons/av/shuffle';
import Slider from 'material-ui/Slider';


class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repeat: false,
      shuffle: false,
      play: false
    };
  }

  play() {
    this.setState({ play: true });
  }

  pause() {
    this.setState({ play: false });
  }

  toggleRepeat() {
    this.setState({ repeat: !this.state.repeat });
  }

  toggleShuffle() {
    this.setState({ shuffle: !this.state.shuffle });
  }

  render() {
    const activeStyle = {
      color: this.context.muiTheme.palette.primary1Color
    };

    return (
      <div className='bottom player'>
        <Slider className='player-slider' value={0.5} />
        <div className='controls'>
          {
            this.state.play ?
              <IconButton onTouchTap={() => this.pause()} ><PauseIcon /></IconButton> :
              <IconButton onTouchTap={() => this.play()} ><PlayIcon /></IconButton>
          }
          <IconButton><RewindIcon /></IconButton>
          <IconButton><ForwardIcon /></IconButton>
          <IconButton><VolumeIcon /></IconButton>
          <IconButton
            onTouchTap={() => this.toggleRepeat()}
            iconStyle={this.state.repeat ? activeStyle : null}
          >
            <RepeatIcon />
          </IconButton>
          <IconButton
            onTouchTap={() => this.toggleShuffle()}
            iconStyle={this.state.shuffle ? activeStyle : null}
          >
            <ShuffleIcon />
          </IconButton>
        </div>
      </div>
    );
  }

}

Player.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

const mapStatetoProps = (state) => ({ playlist: state.playlist });
export default connect(mapStatetoProps)(Player);
