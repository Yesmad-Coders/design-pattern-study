import { useEffect, useState } from "react";

let state = undefined;

let reducer = undefined;

const dispatch = (setState) => (action) => {
  const _state = reducer(state, action);
  setState(_state);
};

export const useDispatch = () => {
  const [_state, _setState] = useState(state);
  useEffect(() => {
    state = _state;
  }, [_state]);
  return dispatch(_setState);
};

export const createStore = (_reducer) => {
  reducer = _reducer;
  state = _reducer(undefined, { type: "" });
};

export const useSelector = (callback) => callback(state);

export default state;
