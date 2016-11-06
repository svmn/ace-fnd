'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
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
    const { track } = this.props;
    if (!track) return null;

    const url = `https://tuzach.in${track.url}`;
    return (
      <div className='player border-right'>
        {
          !this.state.play ?
            <IconButton onTouchTap={() => this.pause()} iconClassName='material-icons'>play_arrow</IconButton> :
              <IconButton onTouchTap={() => this.play()} iconClassName='material-icons'>pause</IconButton>
        }
        <Slider
          style={{
            flex: 1
          }}
          sliderStyle={{
            margin: '15px 0px'
          }}
        />
        <IconButton
          iconClassName='material-icons'
        >volume_down</IconButton>
        <IconButton
          href={url}
          tooltip='Сохранить'
          tooltipPosition='top-center'
          iconClassName='material-icons'
        >file_download</IconButton>
        <IconButton
          tooltip='Like'
          tooltipPosition='top-center'
          iconClassName='material-icons'
        >favorite</IconButton>
      </div>
    );
  }

}

Player.propTypes = {
  track: PropTypes.object
};

const mapStateToProps = (state) => ({
  track: state.playlist.items.find(track => track.id === state.playlist.selected)
});
export default connect(mapStateToProps)(Player);
