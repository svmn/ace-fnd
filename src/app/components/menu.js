'use strict';

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ClearIcon from 'material-ui/svg-icons/communication/clear-all';
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
      <MenuItem leftIcon={<FontIcon className='fa fa-question-circle' />} primaryText='FAQ' />
      <MenuItem leftIcon={<FontIcon className='fa fa-info-circle' />} primaryText='О проекте' />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-history' />}
        href='https://tuzach.in/?app=logs'
        target='_blank'
        primaryText='Логи чата'
      />
      <Divider />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-bug' />}
        href='http://tuzach.reformal.ru'
        target='_blank'
        primaryText='Баги и идеи'
      />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-github' />}
        href='https://github.com/svmn/ace-fnd'
        target='_blank'
        primaryText='Исходники'
      />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-vk' />}
        href='https://vk.com/tuzach_in'
        target='_blank'
        primaryText='Паблик VK'
      />
      <Divider />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-moon-o' />}
        children={
          <Toggle
            label='Ночная тема'
            className='ToggleWrapper'
            onTouchTap={e => e.stopPropagation()}
          />
        }
      />
      <MenuItem
        leftIcon={<ClearIcon />}
        primaryText='Очистить игнор-лист'
      />
    </IconMenu>
  </div>
);

export default Menu;
