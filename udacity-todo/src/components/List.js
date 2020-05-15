import React from 'react';

const List = (props) => (
  <ul>
    {props.items.map((i) => (
      <li key={i.id}>
        <span
          onClick={() => props.toggle && props.toggle(i)}
          style={{ textDecoration: i.complete ? 'line-through' : 'none' }}
        >
          {i.name}
        </span>
        <button onClick={() => props.remove(i)}>X</button>
      </li>
    ))}
  </ul>
);

export default List;
