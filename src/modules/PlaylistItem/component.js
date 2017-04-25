'use strict';

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { grey300, grey500 } from 'material-ui/styles/colors';
import { getAvatarColor } from '../../utils';

export default class PlaylistItem extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  select() {
    this.props.select(this.props.item.id);
  }

  render() {
    const { item, selected } = this.props;
    const { str, length, cover, tags, likes, dislikes, userId } = item;
    const image = cover ? (
      <img src={cover} alt={str} />
    ) : (
      <Avatar
        style={{ float: 'left' }}
        backgroundColor={grey500}
        color={grey300}
        size={64}
        icon={<FontIcon className='fa fa-music' />}
      />
    );

    const userIndicator = (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '3px',
          backgroundColor: getAvatarColor(userId),
          padding: 0
        }}
      />
    );

    return (
      <div className={cx('playlist-item', { selected })} onTouchTap={this.select}>
        {userIndicator}
        <div className='playlist-item-left'>
          {image}
        </div>
        <div className='playlist-item-center'>
          <div className='title'>{str}</div>
          <div className='tags'>{tags}</div>
          <div className='rating'>

            <FontIcon
              className='material-icons'
              color={this.context.muiTheme.palette.secondaryTextColor}
              style={{ fontSize: '12px', top: '1px' }}
            >thumb_up</FontIcon> {likes}
            <FontIcon
              className='material-icons'
              color={this.context.muiTheme.palette.secondaryTextColor}
              style={{ fontSize: '12px', top: '1px', marginLeft: '5px' }}
            >thumb_down</FontIcon> {dislikes}
          </div>
        </div>
        <div className='playlist-item-right'>
          <div className='duration'>{length}</div>
        </div>
      </div>
    );
  }
}

PlaylistItem.propTypes = {
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired
};
PlaylistItem.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};
