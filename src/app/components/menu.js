'use strict';

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';


const Menu = () => (
  <div
    style={{
      float: 'right',
      marginTop: '4px',
      marginRight: '-16px'
    }}
  >
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem primaryText='FAQ' />
      <MenuItem primaryText='О проекте' />
      <MenuItem primaryText='Правила' />
      <MenuItem primaryText='Логи чата' />
      <Divider />
      <MenuItem primaryText='Баги и идеи' />
      <MenuItem primaryText='VK' />
      <Divider />
      <MenuItem
        children={
          <Toggle
            label='Темная тема'
            className='ToggleWrapper'
            onTouchTap={e => e.stopPropagation()}
          />
        }
      />
    </IconMenu>
  </div>
);

export default Menu;
