import React from 'react';
import { connect } from 'react-redux';

class Nav extends React.Component {
  render() {
    const { users, authedUser } = this.props;
    return (
      <nav>
        <div className='nav-left'>
          <button className='nav-link'>Questions</button>
          <button className='nav-link'>Leaderboard</button>
        </div>
        <div className='nav-right'>
          <img className='user-avatar-nav' src={users[authedUser].avatarURL} />
          <div className='user-name-nav'>{authedUser}</div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Nav);
