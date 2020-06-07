import React from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../actions/authedUser';

class Login extends React.Component {
  state = {
    uid: '',
  };

  onChange = (e) => {
    this.setState({ uid: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { dispatch, users } = this.props;
    const uid = this.state.uid;
    console.log(uid, Object.keys(users));
    if (Object.keys(users).includes(uid)) {
      dispatch(authenticateUser(uid));
      this.setState({ uid: '' });
    } else {
      alert('No such user, try again');
    }
  };
  render() {
    return (
      <div className='login'>
        <form
          className='rounded border border-light col-md-6 text-center pt-3'
          onSubmit={this.onSubmit}
        >
          <div className='text-center mb-4'>
            <span className='brand'>
              <p>Q</p>
            </span>
            <h1>Would you rather</h1>
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              value={this.state.uid}
              placeholder='Enter your id'
              onChange={this.onChange}
            />
          </div>
          <button class='btn btn-light btn-block'>Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Login);
