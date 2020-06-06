import React from 'react';
import { connect } from 'react-redux';

class UserItem extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className='user-item d-flex justify-content-between align-items-center'>
        <span className='user-info'>
          <img
            // FIXME: apply proper styling
            style={{ maxHeight: '50px' }}
            src={user.avatarURL}
          ></img>
        </span>
        <span className='user-info'>{user.name}</span>
        <span className='user-info'>{user.id}</span>
        <span className='user-info'>
          {user.answers ? Object.keys(user.answers).length : 0}
        </span>
        <span className='user-info'>
          {user.questions ? Object.keys(user.questions).length : 0}
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ users }, { id }) => {
  const user = users[id];
  return {
    user,
  };
};

export default connect(mapStateToProps)(UserItem);
