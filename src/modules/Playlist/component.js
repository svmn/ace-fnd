'use strict';

import React, { Component, PropTypes } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Component as PlaylistItem } from '../PlaylistItem';
import { Component as PlaylistUploadButton } from '../PlaylistUploadButton';

export default class Playlist extends Component {
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
