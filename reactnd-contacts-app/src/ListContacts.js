import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleInput = (e) => {
    const val = e.target.value.trim();
    this.setState((currState) => ({ query: val }));
  };

  handleQueryNullify = (e) => {
    this.setState({ query: '' });
  };

  render() {
    const displayArr = this.props.contacts.filter((c) =>
      c.name.toLowerCase().includes(this.state.query.toLowerCase())
    );

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            placeholder='Search contacts'
            type='text'
            value={this.state.query}
            onChange={this.handleInput}
          />
          <Link to='/create' className='add-contact'>
            Create contact
          </Link>
        </div>
        {displayArr.length !== this.props.contacts.length && (
          <div className='showing-contacts'>
            <span>
              Now showing {displayArr.length} of {this.props.contacts.length}{' '}
            </span>
            <button onClick={this.handleQueryNullify}>Show all</button>
          </div>
        )}
        <ol className='contact-list'>
          {displayArr.map((c) => (
            <li key={c.id} className='contact-list-item'>
              <div
                className='contact-avatar'
                style={{ backgroundImage: `url(${c.avatarURL})` }}
              />
              <div className='contact-details'>
                <p>{c.name}</p>
                <p>{c.handle}</p>
              </div>
              <button
                className='contact-remove'
                onClick={() => {
                  this.props.onDeleteContact(c);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
