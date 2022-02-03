import {StrictMode} from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {createStore} from './fakeRedux';
// import Strawberry from './Strawberry';

function reducer(state = {count: 0}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {count: state.count + 1};
    case 'DECREMENT':
      return {count: state.count - 1};
    default:
      return state;
  }
}

createStore(reducer);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <App />
    {/* <Strawberry /> */}
  </StrictMode>,
  rootElement
);
