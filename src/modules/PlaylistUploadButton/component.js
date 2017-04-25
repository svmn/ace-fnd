'use strict';

import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import { fullWhite } from 'material-ui/styles/colors';

export default function PlaylistUploadButton(props) {
  const { uploadProgress, upload } = props;
  return (
    <div
      style={{
        position: 'absolute',
        right: '16px',
        bottom: '16px'
      }}
    >
      <FloatingActionButton mini>
        <div>
          {
            // div above for Uncaught TypeError: Cannot read property 'style' of undefined
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
        </div>
      </FloatingActionButton>

        <input
          type='file'
          onChange={e => upload(e.target.files[0])}
        />

    </div>
  );
}

PlaylistUploadButton.propTypes = {
  uploadProgress: PropTypes.number,
  upload: PropTypes.func.isRequired
};
