'use strict';

import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import { fullWhite } from 'material-ui/styles/colors';

export default function PlaylistUploadButton(props) {
  const { uploadProgress, upload } = props;
  return (
    <FloatingActionButton
      style={{
        position: 'absolute',
        right: '16px',
        bottom: '16px'
      }}
      mini
    >
      <div>
        {
          !uploadProgress ? null : (
            <CircularProgress
              color={fullWhite}
              mode='determinate'
              value={uploadProgress}
            />
          )
        }
        <FontIcon
          className='material-icons'
          color={fullWhite}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: '8px 0 0 8px'
          }}
        >playlist_add</FontIcon>
        <input
          type='file'
          onChange={e => upload(e.target.files[0])}
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '40px',
            height: '40px',
            opacity: 0,
            cursor: 'pointer'
          }}
        />
      </div>
    </FloatingActionButton>
  );
}

PlaylistUploadButton.propTypes = {
  uploadProgress: PropTypes.number,
  upload: PropTypes.func.isRequired
};
