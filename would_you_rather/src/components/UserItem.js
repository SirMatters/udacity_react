import React from 'react';
import { connect } from 'react-redux';

class UserItem extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className='user-item'>
        <img
          // FIXME: apply proper styling
          style={{ maxHeight: '50px' }}
          src={user.avatarURL}
        ></img>
        <span>{user.name}</span>
        <span>{user.id}</span>
        <span>{user.answers ? Object.keys(user.answers).length : 0}</span>
        <span>{user.questions.length}</span>
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
