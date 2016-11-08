'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import get from 'lodash/get';
import isMobile from 'is-mobile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import {
  playlistDeselect,
  playlistPrevious,
  playlistNext
} from '../actions/playlist';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      position: 0,
      duration: null,
      volume: typeof localStorage.volume !== 'undefined' ? Number(localStorage.volume) : 0.5
    };
  }

  componentDidMount() {
    this.audio.volume = this.state.volume;
  }

  componentDidUpdate(prevProps) {
    // auto play on track selection
    if (this.props.track && get(this.props, 'track.url') !== get(prevProps, 'track.url')) {
      this.play();
    }
  }

  onProgress() {
    this.setState({
      position: this.audio.currentTime
    });
  }

  onEnd() {
    this.setState({
      playing: false,
      position: 0
    });
    this.props.playlistNext();
  }

  setDuration() {
    this.setState({
      duration: this.audio.duration
    });
  }

  setVolume(e, value) {
    this.audio.volume = value;
    this.setState({ volume: value });
    localStorage.setItem('volume', value);
  }

  play() {
    this.setState({ playing: true });
    this.audio.play();
  }

  pause() {
    this.setState({ playing: false });
    this.audio.pause();
  }

  seek(e, value) {
    this.audio.currentTime = value * this.state.duration;
  }

  render() {
    const { track } = this.props;
    const { playing, position, duration, volume } = this.state;
    const url = track ? `https://tuzach.in${track.url}` : '';

    const progressBar = (
      <Slider
        style={{
          position: 'absolute',
          top: '-10px',
          left: 0,
          width: '100%'
        }}
        sliderStyle={{
          margin: '0'
        }}
        disableFocusRipple
        value={position / duration}
        onChange={this.seek.bind(this)}
      />
    );

    const volumeBar = isMobile() ? null : (
      <Slider
        style={{
          flex: 1
        }}
        sliderStyle={{
          margin: '15px 0'
        }}
        disableFocusRipple
        value={volume}
        onChange={this.setVolume.bind(this)}
      />
    );

    const playerUI = !track ? null : (
      <div
        key='player'
        style={{
          background: 'center center no-repeat',
          backgroundImage: `url('${track.cover}')`,
          backgroundSize: 'cover'
        }}
      >
        <div className={cx('player', 'border-right', { overlay: !!track.cover })}>
          {progressBar}
          {
            !playing ?
              <IconButton onTouchTap={() => this.play()} iconClassName='material-icons'>play_arrow</IconButton> :
                <IconButton onTouchTap={() => this.pause()} iconClassName='material-icons'>pause</IconButton>
          }
          <IconButton
            iconClassName='material-icons'
            onTouchTap={this.props.playlistPrevious}
          >skip_previous</IconButton>
          <IconButton
            iconClassName='material-icons'
            onTouchTap={this.props.playlistNext}
          >skip_next</IconButton>
          <IconButton
            href={url}
            iconClassName='material-icons'
          >file_download</IconButton>
          <IconButton
            iconClassName='material-icons'
          >favorite_border</IconButton>
          {volumeBar}
          <IconButton
            iconClassName='material-icons'
            onTouchTap={this.props.playlistDeselect}
          >keyboard_arrow_down</IconButton>
        </div>
      </div>
    );

    return (
      <ReactCSSTransitionGroup transitionName='player' transitionEnterTimeout={200} transitionLeaveTimeout={200}>
        <audio
          ref={ref => (this.audio = ref)}
          src={url}
          onTimeUpdate={this.onProgress.bind(this)}
          onDurationChange={this.setDuration.bind(this)}
          onEnded={this.onEnd.bind(this)}
        />
        {playerUI}
      </ReactCSSTransitionGroup>
    );
  }

}

Player.propTypes = {
  track: PropTypes.object,
  playlistDeselect: PropTypes.func.isRequired,
  playlistPrevious: PropTypes.func.isRequired,
  playlistNext: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  track: state.playlist.items.find(track => track.id === state.playlist.selected)
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  playlistDeselect,
  playlistPrevious,
  playlistNext
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Player);
