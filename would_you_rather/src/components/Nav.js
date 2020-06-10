import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authenticateUser } from '../actions/authedUser';

class Nav extends React.Component {
  render() {
    const { users, authedUser, dispatch } = this.props;
    return (
      <nav className='navbar navbar-expand-sm navbar-light bg-light'>
        <div className='container'>
          <NavLink className='navbar-brand' to='/'>
            <span className='brand'>
              <p>W</p>
            </span>
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
              <NavLink to='/add' activeClassName='active' className='nav-link'>
                New
              </NavLink>
            </li>
          </ul>
          <div className='ml-auto'>
            <span>{users[authedUser].name}</span>
            <img
              alt='avatar'
              className='user-avatar'
              src={users[authedUser].avatarURL}
            />
            <button
              className='logout'
              onClick={() => {
                dispatch(authenticateUser(''));
              }}
            >
              Logout
            </button>
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
