/* global FileReader */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextArea from 'react-textarea-autosize';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import Paper from 'material-ui/Paper';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

class PostArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  fileAttached() {
    const file = this.fileInputElement.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.setState({ image: e.target.result });
    };
  }

  removeImage() {
    this.setState({ image: null });
  }

  render() {
    const FileInput = () => (
      <input
        type='file'
        ref={elem => (this.fileInputElement = elem)}
        onChange={() => this.fileAttached()}
      />
    );

    const Preview = () => {
      if (this.state.image) {
        return (
          <Paper
            style={{
              height: '100px',
              width: '100px',
              position: 'absolute',
              top: '-108px',
              right: '12px',
              backgroundSize: 'cover',
              backgroundImage: `url('${this.state.image}')`,
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
              onTouchTap={() => this.removeImage()}
            >
              <CloseIcon />
            </IconButton>
          </Paper>
        );
      }
      return null;
    };

    return (
      <div className='postarea bottom'>
        <TextArea rows={2} />
        <div className='icon-container'>
          <IconButton><SendIcon /></IconButton>
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

const mapStatetoProps = (state) => ({ message: state.chat.typedMessage });
export default connect(mapStatetoProps)(PostArea);
