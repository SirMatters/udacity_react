import React from 'react';
import { connect } from 'react-redux';

class UserItem extends React.Component {
  render() {
    const { user } = this.props;
    return <div className='user-item'>{JSON.stringify(user)}</div>;
  }
}

const mapStateToProps = ({ users }, { id }) => {
  const user = users[id];
  return {
    user,
  };
};

export default connect(mapStateToProps)(UserItem);
