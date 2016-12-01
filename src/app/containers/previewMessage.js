'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Paper from 'material-ui/Paper';
import isMobile from 'is-mobile';
import Message from '../components/message';

class PreviewMessage extends Component {
  content() {
    const { message } = this.props;
    const nullMessage = (
      <div style={{ padding: '8px' }}>Такого поста нет :3</div>
    );
    if (isMobile() || message === null) return null;
    return (
      <div
        className='preview'
        ref={ref => (this.ref = ref)}
        key='preview'
        style={{
          top: -9999,
          left: -9999,
          position: 'fixed',
          minWidth: '300px',
          maxWidth: '500px'
        }}
      >
        <Paper
          className='preview'
          style={{
            transition: 'none'
          }}
        >
          {message === undefined ? nullMessage : <Message message={message} />}
        </Paper>
      </div>
    );
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName='preview'
        transitionEnterTimeout={200}
        transitionLeaveTimeout={50}
      >
        {this.content()}
      </ReactCSSTransitionGroup>
    );
  }
}

PreviewMessage.propTypes = {
  message: PropTypes.object
};

const mapStatetoProps = (state) => state.preview;
export default connect(mapStatetoProps, null, null, { withRef: true })(PreviewMessage);
