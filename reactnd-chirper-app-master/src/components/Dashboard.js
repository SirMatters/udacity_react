import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  render() {
    const { tweetIds } = this.props;
    return (
      <div>
        <h3 className='center'>Your timeline</h3>
        <ul className='dashboard-list'>
          {tweetIds.map((t) => (
            <li key={t}>{`Tweetid: ${t}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ tweets }) {
  return {
    tweetIds: Object.keys(tweets).sort(
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
