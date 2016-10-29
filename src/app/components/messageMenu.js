'use strict';

import React, { PropTypes } from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

export default function MessageMenu(props) {
  const controls = !props.controls ? null : (
    <Menu
      onItemTouchTap={props.hidePopover}
    >
      <MenuItem
        primaryText='Delete'
        leftIcon={<FontIcon className='fa fa-trash' />}
        onTouchTap={() => props.chatControl('delmsg', props.messageId)}
      />
      <MenuItem
        primaryText='Force delete' leftIcon={<FontIcon className='fa fa-eraser' />}
        onTouchTap={() => props.chatControl('delmsgref', props.messageId)}
      />
      <MenuItem
        primaryText='Ban'
        leftIcon={<FontIcon className='fa fa-ban' />}
        onTouchTap={() => props.chatControl('banchat', props.messageId)}
      />
      <MenuItem
        primaryText='IP'
        leftIcon={<FontIcon className='fa fa-search' />}
        onTouchTap={() => props.chatControl('whois', props.messageId)}
      />
    </Menu>
  );

  return (
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      canAutoPostion
      onRequestClose={props.hidePopover}
    >
      <Menu
        onItemTouchTap={props.hidePopover}
      >
        <MenuItem
          primaryText='Ответить'
          leftIcon={<FontIcon className='fa fa-at' />}
          onTouchTap={() => props.insertReply(`@${props.messageId}`)}
        />
        <MenuItem
          primaryText='Игнор'
          leftIcon={<FontIcon className='fa fa-minus-circle' />}
          onTouchTap={() => props.ignoreAdd(props.messageId)}
        />
        <MenuItem
          primaryText='Личное cообщение'
          leftIcon={<FontIcon className='fa fa-envelope' />}
          onTouchTap={() => props.insertReply(`!#${props.messageId}`)}
        />
      </Menu>
      {controls}
    </Popover>
  );
}

MessageMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  hidePopover: PropTypes.func.isRequired,
  controls: PropTypes.bool.isRequired,
  messageId: PropTypes.string.isRequired,
  chatControl: PropTypes.func,
  insertReply: PropTypes.func,
  ignoreAdd: PropTypes.func
};
