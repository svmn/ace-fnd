'use strict';

import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { grey500, grey200 } from 'material-ui/styles/colors';

class PlaylistItem extends Component {
  render() {
    const { str, length, cover, tags } = this.props.item;
    const image = cover ? (
      <img src={cover} alt={str} />
    ) : (
      <Avatar
        style={{ float: 'left' }}
        backgroundColor={grey500}
        color={grey200}
        size={64}
        icon={<FontIcon className='fa fa-music' />}
      />
    );

    return (
      <div className='playlist-item'>
        {image}
        <div className='duration'>{length}</div>
        <div className='title'>{str}</div>
        <div className='tags'>{tags}</div>
      </div>
    );
  }
}

PlaylistItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default PlaylistItem;
