import {useEffect, useState} from 'react';

let state = {};

let proxy = new Proxy(state, {});

let reducer = undefined;

const dispatch = setState => action => {
  const _state = reducer(proxy, action);
  setState(_state);
};

export const useDispatch = () => {
  const [_state, _setState] = useState(proxy);
  useEffect(() => {
    proxy = _state;
  }, [_state]);
  return dispatch(_setState);
};

export const createStore = _reducer => {
  reducer = _reducer;
  proxy = _reducer(undefined, {type: ''});
};

export const useSelector = callback => callback(proxy);

export default state;
