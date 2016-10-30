'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import PlaylistItem from '../components/playlistItem';

class Playlist extends Component {
  render() {
    const { playlist } = this.props;
    const placeholder = (
      <div style={{ padding: '16px' }}>
        Плейлист пуст. Советуем посмотреть фид картинок и webm.
      </div>
    );
    return (
      <div className='middle border-right'>
        {playlist.length ? null : placeholder}
        <Scrollbars
          autoHide
          className='scrollbar-container'
        >
          {
            playlist.map((item, i) => (
              <PlaylistItem item={item} key={i} />
            ))
          }
        </Scrollbars>
      </div>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired
};

const mapStatetoProps = (state) => ({ playlist: state.playlist });
export default connect(mapStatetoProps)(Playlist);
