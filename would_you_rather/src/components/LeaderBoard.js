import React from 'react';
import { connect } from 'react-redux';
import UserItem from './UserItem';

class LeaderBoard extends React.Component {
  render() {
    const { userIds } = this.props;
    return (
      <ul className='leaderboard'>
        {userIds.map((id) => (
          <li key={id}>
            <UserItem id={id} />
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    userIds: Object.keys(users).sort((a, b) => {
      const answersB = b.answers ? Object.keys(b.answers).length : 0;
      const answersA = a.answers ? Object.keys(a.answers).length : 0;
      return answersA - answersB;
    }),
  };
};

export default connect(mapStateToProps)(LeaderBoard);
