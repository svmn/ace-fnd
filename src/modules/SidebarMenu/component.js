'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

export default function SidebarMenu(props) {
  const { selected, select } = props;
  return (
    <BottomNavigation
      className='sidebar-menu'
      selectedIndex={selected}
    >
      <BottomNavigationItem
        label='Плейлист'
        icon={<FontIcon className='fa fa-music' />}
        onTouchTap={() => select('playlist')}
      />
      <BottomNavigationItem
        label='Картинки'
        icon={<FontIcon className='fa fa-picture-o' />}
        onTouchTap={() => select('imageFeed')}
      />
    </BottomNavigation>
  );
}

SidebarMenu.propTypes = {
  selected: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired
};
