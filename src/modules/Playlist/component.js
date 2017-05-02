'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Component as PlaylistItem } from '../PlaylistItem';
import { Component as PlaylistUploadButton } from '../PlaylistUploadButton';

export default class Playlist extends Component {
  render() {
    const { items, selected, uploadProgress } = this.props;

    return (
      <div className='playlist'>
        {
          items.length
          ?
            <Scrollbars autoHide>
              {
                items.map(item => (
                  <PlaylistItem
                    item={item}
                    key={item.id}
                    selected={item.id === selected}
                    select={this.props.select}
                    openImage={this.props.openImage}
                  />
                ))
              }
            </Scrollbars>
          :
            <div className='placeholder'>
                Плейлист пуст. Будьте первым кто загрузит трек.
            </div>
        }
        <PlaylistUploadButton uploadProgress={uploadProgress} upload={this.props.upload} />
      </div>
    );
  }
}

Playlist.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.string,
  uploadProgress: PropTypes.number,
  select: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  openImage: PropTypes.func.isRequired
};
