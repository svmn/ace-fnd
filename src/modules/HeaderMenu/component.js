/* global VERSION */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import { fullWhite } from 'material-ui/styles/colors';

export default function HeaderMenu(props) {
  return (
    <IconMenu
      iconButtonElement={
        <IconButton iconClassName='material-icons'>more_vert</IconButton>
      }
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      style={{ zIndex: 1 }}
      iconStyle={{ color: fullWhite }}
    >
      <MenuItem leftIcon={<FontIcon className='fa fa-question-circle' />} primaryText='FAQ' />
      <MenuItem leftIcon={<FontIcon className='fa fa-info-circle' />} primaryText='О проекте' />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-history' />}
        href='https://tuzach.in/api/?app=logs'
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
        href='https://github.com/svmn/ace-rx'
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
        primaryText='Ночная тема'
        rightToggle={
          <Toggle
            toggled={props.theme === 'dark'}
            onToggle={(e, v) => props.setTheme(v ? 'dark' : 'light')}
          />
        }
      />
      <MenuItem
        leftIcon={<FontIcon className='material-icons'>clear_all</FontIcon>}
        primaryText='Очистить игнор-лист'
        onTouchTap={props.ignoreClear}
      />
      <Divider />
      <MenuItem
        primaryText='Версия'
        secondaryText={VERSION}
      />
    </IconMenu>
  );
}

HeaderMenu.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  ignoreClear: PropTypes.func.isRequired
};
