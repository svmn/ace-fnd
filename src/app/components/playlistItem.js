'use strict';

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { grey300, grey500 } from 'material-ui/styles/colors';

class PlaylistItem extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  select() {
    this.props.select(this.props.item.id);
  }

  render() {
    const { item, selected } = this.props;
    const { str, length, cover, tags } = item;
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

    return (
      <div className={cx('playlist-item', { selected })} onTouchTap={this.select}>
        <div className='playlist-item-left'>
          {image}
        </div>
        <div className='playlist-item-center'>
          <div className='title'>{str}</div>
          <div className='tags'>{tags}</div>
        </div>
        <div className='playlist-item-right'>
          <div className='duration'>{length}</div>
          <div className='rating'>
            <FontIcon
              className='fa fa-heart'
              color={this.context.muiTheme.palette.secondaryTextColor}
              style={{ fontSize: '12px', transition: 'none' }}
            />
            8
          </div>
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

export default PlaylistItem;
