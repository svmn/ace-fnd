'use strict';

import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { getAvatarColor } from '../utils';

class UserAvatar extends Component {
  render() {
    const { userId } = this.props;
    const color = getAvatarColor(userId);
    return (
      <Avatar
        backgroundColor={color}
        size={20}
        color='rgba(255,255,255,0.8)'
        icon={<FontIcon className='fa fa-user' />}
        style={{
          cursor: 'pointer',
          // android < 4.4 fixes
          display: 'block',
          textAlign: 'center',
          lineHeight: '20px'
        }}
        title={userId}
      />
    );
  }
}

UserAvatar.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserAvatar;
