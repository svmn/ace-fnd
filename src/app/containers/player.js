'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import { green900 as likeColor, red900 as dislikeColor } from 'material-ui/styles/colors';
import throttle from 'lodash/throttle';
import get from 'lodash/get';
import isMobile from 'is-mobile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import {
  playlistDeselect,
  playlistPrevious,
  playlistNext,
  playlistVote
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
    this.onProgress = throttle(this.onProgress.bind(this), 500);
    this.onEnd = this.onEnd.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.setVolume = throttle(this.setVolume.bind(this), 100);
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.seek = this.seek.bind(this);
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
    this.setState({ position: this.audio.currentTime });
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

  like() {
    this.props.playlistVote(this.props.track.id, 1);
  }

  dislike() {
    this.props.playlistVote(this.props.track.id, -1);
  }

  render() {
    const { track } = this.props;
    const { playing, position, duration, volume } = this.state;
    const url = track ? `https://tuzach.in${track.url}` : '';

    const progressBar = (
      <Slider
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16
        }}
        sliderStyle={{
          margin: '0'
        }}
        disableFocusRipple
        value={position / duration}
        onChange={this.seek}
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
        onChange={this.setVolume}
      />
    );

    const playerUI = !track ? null : (
      <div
        key='player'
        style={{
          background: 'center center no-repeat',
          backgroundImage: `url('${track.cover_big}')`,
          backgroundSize: 'cover'
        }}
      >
        <div className={cx('player', 'border-right', { overlay: !!track.cover })}>
          {progressBar}
          {
            !playing ?
              <IconButton onTouchTap={this.play} iconClassName='material-icons'>play_arrow</IconButton> :
                <IconButton onTouchTap={this.pause} iconClassName='material-icons'>pause</IconButton>
          }
          <IconButton
            iconClassName='material-icons'
            onTouchTap={this.props.playlistNext}
          >skip_next</IconButton>
          {volumeBar}
          <IconButton
            href={url}
            iconClassName='material-icons'
          >file_download</IconButton>
          <IconButton
            iconClassName='material-icons'
            iconStyle={track.voted !== '1' ? {} : {
              color: likeColor
            }}
            onTouchTap={this.like}
          >thumb_up</IconButton>
          <IconButton
            iconClassName='material-icons'
            iconStyle={track.voted !== '-1' ? {} : {
              color: dislikeColor
            }}
            onTouchTap={this.dislike}
          >thumb_down</IconButton>
          <IconButton
            iconClassName='material-icons'
            onTouchTap={this.props.playlistDeselect}
          >keyboard_arrow_up</IconButton>
        </div>
      </div>
    );

    return (
      <ReactCSSTransitionGroup transitionName='player' transitionEnterTimeout={200} transitionLeaveTimeout={200}>
        <audio
          ref={ref => (this.audio = ref)}
          src={url}
          onTimeUpdate={this.onProgress}
          onDurationChange={this.setDuration}
          onEnded={this.onEnd}
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
  playlistNext: PropTypes.func.isRequired,
  playlistVote: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  track: state.playlist.items.find(track => track.id === state.playlist.selected)
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  playlistDeselect,
  playlistPrevious,
  playlistNext,
  playlistVote
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Player);
