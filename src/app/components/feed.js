'use strict';

import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function Feed(props) {
  return (
    <div className='middle border-right'>
      <Scrollbars
        autoHide
        className='scrollbar-container'
      >
        <ReactCSSTransitionGroup
          transitionName='feed'
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}
        >
          {props.children}
        </ReactCSSTransitionGroup>
      </Scrollbars>
    </div>
  );
}

Feed.propTypes = {
  children: PropTypes.node
};
