'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import PlaylistItem from '../components/playlistItem';
import { playlistSelect } from '../actions/playlist';

class Playlist extends Component {
  render() {
    const { playlist, selected } = this.props;
    const placeholder = (
      <div style={{ padding: '16px' }}>
        Плейлист пуст. Советуем посмотреть фид картинок и webm.
      </div>
    );
    return (
      <div className='middle border-right' style={{ position: 'relative' }}>
        {playlist.length ? null : placeholder}
        <Scrollbars
          autoHide
          className='scrollbar-container'
        >
          {
            playlist.map((item, i) => (
              <PlaylistItem
                item={item}
                key={i}
                selected={item.id === selected}
                select={this.props.playlistSelect}
              />
            ))
          }
        </Scrollbars>
        <FloatingActionButton
          style={{
            position: 'absolute',
            right: '16px',
            bottom: '16px'
          }}
          mini
        >
          <FontIcon className='material-icons'>playlist_add</FontIcon>
        </FloatingActionButton>
      </div>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired,
  selected: PropTypes.string,
  playlistSelect: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  playlist: state.playlist.items,
  selected: state.playlist.selected
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ playlistSelect }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
