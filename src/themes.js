'use strict';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {
  grey500,
  grey700,
  grey800,
  grey900,
  darkWhite,
  darkBlack,
  deepOrange200,
  deepOrange500,
  lightWhite
} from 'material-ui/styles/colors';

lightBaseTheme.appBar = {
  padding: '16px'
};
lightBaseTheme.slider = {
  trackColor: grey500,
  trackColorSelected: grey700
};
lightBaseTheme.palette.primary1Color = grey900;
lightBaseTheme.palette.textColor = darkBlack;

darkBaseTheme.appBar = {
  color: grey900,
  textColor: darkWhite,
  padding: '16px'
};
darkBaseTheme.bottomNavigation = {
  backgroundColor: grey900
};
darkBaseTheme.palette.primary1Color = deepOrange500;
darkBaseTheme.palette.accent2Color = deepOrange200;
darkBaseTheme.palette.accent3Color = deepOrange200;
darkBaseTheme.palette.canvasColor = grey800;
darkBaseTheme.palette.textColor = darkWhite;
darkBaseTheme.palette.secondaryTextColor = lightWhite;

export default {
  light: lightBaseTheme,
  dark: darkBaseTheme
};
