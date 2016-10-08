'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextArea from 'react-textarea-autosize';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import Paper from 'material-ui/Paper';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CircularProgress from 'material-ui/CircularProgress';
import * as actions from '../actions/postarea';

class PostArea extends Component {
  focus() {
    this.textarea.focus();
  }

  render() {
    const { message, preview, processing } = this.props;
    const FileInput = () => (
      <input
        type='file'
        onChange={(e) => this.props.postareaSetFile(e.target.files[0])}
      />
    );
    const progress = processing ? (
      <CircularProgress
        size={42}
        thickness={3}
        color='white'
        style={{
          position: 'absolute',
          top: '29px',
          left: '29px',
          pointerEvents: 'none'
        }}
      />
    ) : null;

    const Preview = () => {
      if (preview) {
        return (
          <Paper
            style={{
              height: '100px',
              width: '100px',
              position: 'absolute',
              top: '-108px',
              right: '12px',
              backgroundSize: 'cover',
              backgroundImage: `url('${preview}')`,
              textAlign: 'center'
            }}
          >
            <IconButton
              style={{
                marginTop: '26px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: '50%'
              }}
              iconStyle={{
                color: '#FFF'
              }}
              onTouchTap={() => this.props.postareaResetFile()}
            >
              <CloseIcon />
            </IconButton>
            {progress}
          </Paper>
        );
      }
      return null;
    };

    return (
      <div className='postarea bottom'>
        <TextArea
          rows={2}
          value={message}
          onChange={(e) => this.props.postareaSetMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              this.props.postareaSend();
            }
          }}
          ref={ref => (this.textarea = ref)}
        />
        <div className='icon-container'>
          <IconButton onTouchTap={this.props.postareaSend} ><SendIcon /></IconButton>
          <IconButton>
            <AddPhotoIcon />
          </IconButton>
          <FileInput />
        </div>
        <Preview />
      </div>
    );
  }
}

PostArea.propTypes = {
  message: PropTypes.string,
  preview: PropTypes.string,
  processing: PropTypes.bool,
  postareaSetMessage: PropTypes.func.isRequired,
  postareaSetFile: PropTypes.func.isRequired,
  postareaResetFile: PropTypes.func.isRequired,
  postareaSend: PropTypes.func.isRequired
};

const mapStatetoProps = (state) => state.postarea;
export default connect(mapStatetoProps, actions, null, { withRef: true })(PostArea);
