import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    const { users, authedUser } = this.props;
    return (
      <nav className='navbar navbar-expand-sm navbar-light bg-light'>
        <div className='container'>
          <NavLink className='navbar-brand' to='/'>
            <span className='brand'>
              <p>Q</p>
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
              <NavLink to='/new' activeClassName='active' className='nav-link'>
                New
              </NavLink>
            </li>
          </ul>
          <div className='ml-auto'>
            <span className='user-name-nav'>{authedUser}</span>
            <img className='user-avatar' src={users[authedUser].avatarURL} />
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
