import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    const { users, authedUser } = this.props;
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container'>
          <NavLink className='navbar-brand' to='/'>
            Q
          </NavLink>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <NavLink
                exact
                to='/'
                activeClassName='active'
                className='nav-link'
              >
                Questions
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/leaderboard'
                activeClassName='active'
                className='nav-link'
              >
                Leaderboard
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/new' activeClassName='active' className='nav-link'>
                New
              </NavLink>
            </li>
          </ul>
          <div className='ml-auto'>
            <div className='user-name-nav'>{authedUser}</div>
            <img
              className='user-avatar-nav'
              style={{ maxHeight: '50px' }}
              src={users[authedUser].avatarURL}
            />
          </div>
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
