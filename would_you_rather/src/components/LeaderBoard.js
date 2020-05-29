import React from 'react';
import { connect } from 'react-redux';
import UserItem from './UserItem';

class LeaderBoard extends React.Component {
  render() {
    const { userIds } = this.props;
    return (
      <div className='leaderboard'>
        <div className='leaderboard-header'>
          <span>Avatar</span>
          <span>Name</span>
          <span>Id</span>
          <span>Questions answered</span>
          <span>Questions asked</span>
        </div>
        <ul className='leaderboard-body'>
          {userIds.map((id) => (
            <li key={id}>
              <UserItem id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    userIds: Object.keys(users).sort((a, b) => {
      const answersB = users[b].answers
        ? Object.keys(users[b].answers).length
        : 0;
      const answersA = users[a].answers
        ? Object.keys(users[a].answers).length
        : 0;
      return answersB - answersA;
    }),
  };
};

export default connect(mapStateToProps)(LeaderBoard);
