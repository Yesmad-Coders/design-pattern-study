import {useDispatch} from './fakeRedux';
import Strawberry from './Strawberry';

export default function App() {
  const dispatch = useDispatch();

  return (
    <div
      className="App"
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '100px',
        }}
      >
        <h1 style={{fontSize: '5rem'}}>Aussie Strawberry 🍓</h1>
        <div>
          <button
            onClick={() => {
              dispatch({
                type: 'INCREMENT',
              });
            }}
            style={{
              margin: '2px',
              backgroundColor: '#f9ca24',
              borderRadius: '25px',
              width: '200px',
              height: '100px',
              fontSize: '3rem',
              border: '1px grey',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              dispatch({
                type: 'DECREMENT',
              });
            }}
            style={{
              margin: '2px',
              backgroundColor: '#6ab04c',
              borderRadius: '25px',
              width: '200px',
              height: '100px',
              fontSize: '3rem',
              border: '1px grey',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            -
          </button>
        </div>
      </div>
      <Strawberry />
    </div>
  );
}
