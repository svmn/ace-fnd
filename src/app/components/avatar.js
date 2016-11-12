'use strict';

import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { getAvatarColor } from '../utils';

class UserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false
    };
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  showTooltip() {
    this.setState({ showTooltip: true });
  }

  hideTooltip() {
    this.setState({ showTooltip: false });
  }

  render() {
    const { userId } = this.props;
    const color = getAvatarColor(userId);
    return (
      <div>
        <Avatar
          backgroundColor={color}
          size={20}
          color='rgba(255,255,255,0.8)'
          icon={<FontIcon className='fa fa-fw fa-user' />}
          style={{
            cursor: 'pointer'
          }}
          onMouseEnter={this.showTooltip}
          onMouseLeave={this.hideTooltip}
        />
        <div
          style={{
            display: this.state.showTooltip ? 'block' : 'none',
            position: 'absolute',
            top: '10px',
            left: '20px',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '0 8px',
            zIndex: '3000'
          }}
        >
          {userId}
        </div>
      </div>
    );
  }
}

UserAvatar.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserAvatar;
