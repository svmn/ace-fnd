'use strict';

import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';

class UserAvatar extends Component {
  render() {
    const { userId } = this.props;
    return (
      <Avatar
        src={`https://www.gravatar.com/avatar/${userId}?s=40&d=monsterid`}
        style={{
          cursor: 'pointer',
          // android < 4.4 fixes
          lineHeight: '40px',
          textAlign: 'center',
          display: 'block'
        }}
      />
    );
  }
}

UserAvatar.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserAvatar;
