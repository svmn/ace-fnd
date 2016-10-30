'use strict';

import React, { PropTypes } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

export default function SidebarMenu(props) {
  const { selected, select } = props;
  return (
    <BottomNavigation
      selectedIndex={selected}
      className='bottom border-right'
      style={{ width: 'auto' }}
    >
      <BottomNavigationItem
        label='Плейлист'
        icon={<FontIcon className='fa fa-music' />}
        onTouchTap={() => select(0)}
      />
      <BottomNavigationItem
        label='Meme Feed'
        icon={<FontIcon className='fa fa-picture-o' />}
        onTouchTap={() => select(1)}
      />
      <BottomNavigationItem
        label='Webm Feed'
        icon={<FontIcon className='fa fa-film' />}
        onTouchTap={() => select(2)}
      />
    </BottomNavigation>
  );
}

SidebarMenu.propTypes = {
  selected: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired
};
