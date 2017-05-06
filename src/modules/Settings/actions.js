'use strict';

import omit from 'lodash/omit';

import {
  SETTINGS_OPEN,
  SETTINGS_CLOSE,
  SETTINGS_SET
} from '../../actionTypes';

import { isMobile } from '../../utils';

export function open() {
  return { type: SETTINGS_OPEN };
}

export function close() {
  return { type: SETTINGS_CLOSE };
}

export function set(key, value) {
  return (dispatch, getState) => {
    dispatch({ type: SETTINGS_SET, data: { [key]: value } });
    const settings = omit(getState().settings, 'isOpen');
    localStorage.setItem('settings', JSON.stringify(settings));
  };
}

export function load() {
  const settings = Object.assign(
    { postingMode: isMobile() ? 'natural' : 'inverse' },
    JSON.parse(localStorage.settings || '{}')
  );

  return { type: SETTINGS_SET, data: settings };
}
