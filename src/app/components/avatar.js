'use strict';

import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { getAvatar } from '../utils';

class UserAvatar extends Component {
  render() {
    const { userId } = this.props;
    const { icon, color } = getAvatar(userId);
    return (
      <Avatar
        backgroundColor={color}
        color='rgba(255,255,255,0.8)'
        style={{
          cursor: 'pointer',
          // android < 4.4 fixes
          lineHeight: '40px',
          textAlign: 'center',
          display: 'block'
        }}
      >{icon}</Avatar>
    );
  }
}

UserAvatar.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserAvatar;
