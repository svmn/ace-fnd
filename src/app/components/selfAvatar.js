'use strict';

import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from './avatar';

export default function SelfAvatar(props) {
  return (
    <div className='avatar'>
      <Avatar image={props.image} />
      {
        !props.uploading ? null : (
          <CircularProgress
            style={{
              position: 'absolute',
              left: 0
            }}
            size={36}
            color='rgba(255,255,255,0.5)'
          />
        )
      }
      <input
        type='file'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          opacity: 0
        }}
        onChange={e => props.upload(e.target.files[0])}
      />
    </div>
  );
}

SelfAvatar.propTypes = {
  image: PropTypes.string,
  uploading: PropTypes.bool,
  upload: PropTypes.func.isRequired
};
