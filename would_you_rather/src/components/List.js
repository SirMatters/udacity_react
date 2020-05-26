import React from 'react';

const List = (props) => {
  const displayItems = props.items.map((i) => <li>{i}</li>);
  return <ul>{displayItems}</ul>;
};

export default List;
