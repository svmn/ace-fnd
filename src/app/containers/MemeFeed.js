'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import { feedStart, feedStop } from '../actions/memeFeed';
import Feed from '../components/feed';

class MemeFeed extends Component {
  componentDidMount() {
    this.props.feedStart();
  }

  render() {
    const { feed } = this.props;
    return (
      <Feed>
        {
          feed.map((post, i) => (
            <Paper style={{ margin: '10px' }} key={post + (feed.length - i)} >
              <img
                src={post}
                alt={post}
                style={{
                  display: 'block',
                  maxWidth: '100%'
                }}
              />
            </Paper>
          ))
        }
      </Feed>
    );
  }
}

MemeFeed.propTypes = {
  feed: PropTypes.array.isRequired,
  feedStart: PropTypes.func.isRequired,
  feedStop: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ feed: state.memeFeed });
const mapDispatchToProps = (dispatch) => bindActionCreators({ feedStart, feedStop }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MemeFeed);
