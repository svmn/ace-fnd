'use strict';

import React, { PropTypes } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

export default function SidebarMenu(props) {
  const { selected, select } = props;
  return (
    <BottomNavigation
      selectedIndex={selected}
    >
      <BottomNavigationItem
        label='Плейлист'
        icon={<FontIcon className='fa fa-music' />}
        onTouchTap={() => select(0)}
      />
      <BottomNavigationItem
        label='Картинки'
        icon={<FontIcon className='fa fa-picture-o' />}
        onTouchTap={() => select(1)}
      />
    </BottomNavigation>
  );
}

SidebarMenu.propTypes = {
  selected: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired
};
