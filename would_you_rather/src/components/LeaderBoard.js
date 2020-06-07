import React from 'react';
import { connect } from 'react-redux';
import UserItem from './UserItem';

class LeaderBoard extends React.Component {
  render() {
    const { userIds } = this.props;
    return (
      <div className='leaderboard container '>
        <div className='row my-1 border border-light rounded table-header'>
          <span className='col user-info'>Avatar</span>
          <span className='col user-info'>Name</span>
          <span className='col user-info'>Id</span>
          <span className='col user-info'>Questions answered</span>
          <span className='col user-info'>Questions asked</span>
        </div>
        <ul className='list-group mt-2'>
          {userIds.map((id) => (
            <li className='row py-2 my-1 border border-light rounded' key={id}>
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
