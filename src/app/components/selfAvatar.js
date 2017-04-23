'use strict';

import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from './avatar';

export default function SelfAvatar(props) {
  return (
    <div className='avatar'>
      <Avatar image={props.image} userId={props.userId} />
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
        onChange={e => props.upload(e.target.files[0])}
      />
    </div>
  );
}

SelfAvatar.propTypes = {
  userId: PropTypes.string,
  image: PropTypes.string,
  uploading: PropTypes.bool,
  upload: PropTypes.func.isRequired
};