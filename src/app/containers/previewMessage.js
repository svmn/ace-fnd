'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import isMobile from 'is-mobile';
import Message from '../components/message';

class PreviewMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      positionX: 0,
      positionY: 0
    };
    this.previewOffsetX = 20;
    this.previewOffsetY = 20;
  }

  componentWillReceiveProps(nextProps) {
    if (this.ref) {
      const previewHeight = this.ref.offsetHeight;
      const previewWidth = this.ref.offsetWidth;
      const rightEdgeDistance = window.innerWidth - nextProps.positionX - previewWidth - this.previewOffsetX;
      const bottomEdgeDistance = window.innerHeight - nextProps.positionY - previewHeight - this.previewOffsetY;
      this.setState({
        positionX: (rightEdgeDistance <= 0) ?
          nextProps.positionX - previewWidth - this.previewOffsetX :
          nextProps.positionX + this.previewOffsetX,
        positionY: (bottomEdgeDistance <= 0) ?
          nextProps.positionY - previewHeight - this.previewOffsetY :
          nextProps.positionY + this.previewOffsetY
      });
    }
  }

  render() {
    const { message } = this.props;
    return !message || isMobile() ? null : (
      <div
        className='preview'
        ref={ref => (this.ref = ref)}
        style={{
          position: 'fixed',
          top: this.state.positionY,
          left: this.state.positionX,
          minWidth: '300px',
          maxWidth: '600px'
        }}
      >
        <Paper
          className='preview'
          style={{
            transition: 'none'
          }}
        >
          <Message message={message} />
        </Paper>
      </div>
    );
  }
}

PreviewMessage.propTypes = {
  message: PropTypes.object,
  positionX: PropTypes.number,
  positionY: PropTypes.number
};

const mapStatetoProps = (state) => state.preview;
export default connect(mapStatetoProps)(PreviewMessage);
