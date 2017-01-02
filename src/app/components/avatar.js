'use strict';

import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import {
  getAvatarColor,
  getAvatarIcon
} from '../utils';

class UserAvatar extends Component {
  render() {
    const { userId, image } = this.props;
    return (
      <Avatar
        size={36}
        backgroundColor={getAvatarColor(userId)}
        src={image}
        style={{
          cursor: 'pointer'
        }}
        title={userId}
        children={image ? null : getAvatarIcon(userId)}
      />
    );
  }
}

UserAvatar.propTypes = {
  userId: PropTypes.string,
  image: PropTypes.string
};

export default UserAvatar;
