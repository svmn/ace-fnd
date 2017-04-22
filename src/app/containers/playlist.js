'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import PlaylistItem from '../components/playlistItem';
import PlaylistUploadButton from '../components/playlistUploadButton';
import { playlistSelect, playlistUpload } from '../actions/playlist';

class Playlist extends Component {
  render() {
    const { items, selected, uploadProgress } = this.props;
    const placeholder = (
      <div style={{ padding: '16px' }}>
        Плейлист пуст. Советуем посмотреть фид картинок и webm.
      </div>
    );
    return (
      <div className='playlist'>
        {items.length ? null : placeholder}
        <Scrollbars autoHide>
          {
            items.map((item, i) => (
              <PlaylistItem
                item={item}
                key={i}
                selected={item.id === selected}
                select={this.props.playlistSelect}
              />
            ))
          }
        </Scrollbars>
        <PlaylistUploadButton uploadProgress={uploadProgress} upload={this.props.playlistUpload} />
      </div>
    );
  }
}

Playlist.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.string,
  uploadProgress: PropTypes.number,
  playlistSelect: PropTypes.func.isRequired,
  playlistUpload: PropTypes.func.isRequired
};

const mapStateToProps = (state) => state.playlist;
const mapDispatchToProps = (dispatch) => bindActionCreators({ playlistSelect, playlistUpload }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
