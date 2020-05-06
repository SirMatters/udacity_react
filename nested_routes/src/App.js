import React from 'react';
import { Link, Route } from 'react-router-dom';
const topics = [
  {
    name: 'React Router',
    id: 'react-router',
    description: 'Declarative, component based routing for React',
    resources: [
      {
        name: 'URL Parameters',
        id: 'url-parameters',
        description:
          "URL parameters are parameters whose values are set dynamically in a page's URL. This allows a route to render the same component while passing that component the dynamic portion of the URL so it can change based off of it.",
        url: 'https://tylermcginnis.com/react-router-url-parameters/',
      },
      {
        name: 'Programmatically navigate',
        id: 'programmatically-navigate',
        description:
          "When building an app with React Router, eventually you'll run into the question of navigating programmatically. The goal of this post is to break down the correct approaches to programmatically navigating with React Router.",
        url:
          'https://tylermcginnis.com/react-router-programmatically-navigate/',
      },
    ],
  },
  {
    name: 'React.js',
    id: 'reactjs',
    description: 'A JavaScript library for building user interfaces',
    resources: [
      {
        name: 'React Lifecycle Events',
        id: 'react-lifecycle',
        description:
          "React Lifecycle events allow you to tie into specific phases of a component's life cycle",
        url:
          'https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/',
      },
      {
        name: 'React AHA Moments',
        id: 'react-aha',
        description: "A collection of 'Aha' moments while learning React.",
        url: 'https://tylermcginnis.com/react-aha-moments/',
      },
    ],
  },
  {
    name: 'Functional Programming',
    id: 'functional-programming',
    description:
      'In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.',
    resources: [
      {
        name: 'Imperative vs Declarative programming',
        id: 'imperative-declarative',
        description:
          'A guide to understanding the difference between Imperative and Declarative programming.',
        url: 'https://tylermcginnis.com/imperative-vs-declarative-programming/',
      },
      {
        name:
          'Building User Interfaces with Pure Functions and Function Composition',
        id: 'fn-composition',
        description:
          'A guide to building UI with pure functions and function composition in React',
        url:
          'https://tylermcginnis.com/building-user-interfaces-with-pure-functions-and-function-composition-in-react-js/',
      },
    ],
  },
];

const Resource = ({ match }) => {
  const res = topics
    .find(({ id }) => id === match.params.topicId)
    .resources.find(({ id }) => id === match.params.resId);

  return (
    <div>
      <h1>{res.name}</h1>
      <p>{res.description}</p>
      <a href={res.url}>More info</a>
    </div>
  );
};

const Topic = ({ match }) => {
  const { topicId } = match.params;
  const topic = topics.filter((t) => t.id === topicId)[0];
  return (
    <div>
      <h1>Topic</h1>
      <p>{topic.description}</p>
      <ul>
        {topic.resources.map((r) => (
          <li key={r.id}>
            <Link to={`${match.url}/${r.id}`}>{r.name}</Link>
          </li>
        ))}
      </ul>
      <br />
      <Route path={`${match.path}/:resId`} component={Resource} />
    </div>
  );
};

const Topics = ({ match }) => {
  return (
    <div>
      <h1>Topics</h1>
      <ul>
        {topics.map((t) => (
          <li key={t.id}>
            <Link to={`${match.url}/${t.id}`}>{t.name}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Route path={`${match.path}/:topicId`} component={Topic} />
    </div>
  );
};

const Home = () => <h1>Home</h1>;

function App() {
  return (
    <div className='App'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/Topics'>Topics</Link>
        </li>
      </ul>
      <hr />
      <Route exact path='/' component={Home} />
      <Route path='/topics' component={Topics} />
    </div>
  );
}

export default App;
