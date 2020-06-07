import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class UserItem extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <span className='user-info col'>
          <img
            alt='avatar'
            className='user-avatar no-margin'
            src={user.avatarURL}
          ></img>
        </span>
        <span className='user-info col'>{user.name}</span>
        <span className='user-info col'>{user.id}</span>
        <span className='user-info col'>
          {user.answers ? Object.keys(user.answers).length : 0}
        </span>
        <span className='user-info col'>
          {user.questions ? Object.keys(user.questions).length : 0}
        </span>
      </Fragment>
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
