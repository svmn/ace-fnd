'use strict';

import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import anonymous from '../../image/anonymous.png';

class UserAvatar extends Component {
  render() {
    const { userId, image } = this.props;
    return (
      <Avatar
        size={36}
        src={image || anonymous}
        style={{
          cursor: 'pointer'
        }}
        title={userId}
      />
    );
  }
}

UserAvatar.propTypes = {
  userId: PropTypes.string,
  image: PropTypes.string
};

export default UserAvatar;
