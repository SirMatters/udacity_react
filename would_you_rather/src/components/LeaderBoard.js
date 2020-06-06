import React from 'react';
import { connect } from 'react-redux';
import UserItem from './UserItem';

class LeaderBoard extends React.Component {
  render() {
    const { userIds } = this.props;
    return (
      <div className='leaderboard'>
        <div className='user-item d-flex justify-content-between align-items-center list-group-item my-1 list-group-item-light rounded'>
          <span className='user-info'>Avatar</span>
          <span className='user-info'>Name</span>
          <span className='user-info'>Id</span>
          <span className='user-info'>Questions answered</span>
          <span className='user-info'>Questions asked</span>
        </div>
        <ul className='list-group mt-2'>
          {userIds.map((id) => (
            <li
              className='list-group-item my-1 list-group-item-light rounded box-shadow'
              key={id}
            >
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
