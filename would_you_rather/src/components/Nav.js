import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    const { users, authedUser } = this.props;
    return (
      <nav>
        <ul className='nav-left'>
          <li>
            <NavLink to='/' activeClassName='active' className='nav-link'>
              Questions
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/leaderboard'
              activeClassName='active'
              className='nav-link'
            >
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active' className='nav-link'>
              New
            </NavLink>
          </li>
        </ul>
        <div className='nav-right'>
          <img
            className='user-avatar-nav'
            style={{ maxHeight: '50px' }}
            src={users[authedUser].avatarURL}
          />
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
