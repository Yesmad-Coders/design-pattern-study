import { useDispatch, useSelector } from "./fakeRedux";
import "./styles.css";

export default function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state);

  return (
    <div className="App">
      <h1>{`${count}`}</h1>
      <button
        onClick={() => {
          dispatch({
            type: "INCREMENT"
          });
        }}
      >
        increase
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "DECREMENT"
          });
        }}
      >
        decrease
      </button>
    </div>
  );
}
