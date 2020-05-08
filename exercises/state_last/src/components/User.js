import React from 'react';

const User = (props) => {
  return (
    <div>
      User {props.userName} played{' '}
      {props.displayGames ? props.gamesPlayed : '*/'} games
    </div>
  );
};

export default User;
