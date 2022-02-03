import React from 'react';
import {useSelector} from './fakeRedux';

const Strawberry = () => {
  const {count} = useSelector(state => state);
  return <div style={{fontSize: '3rem'}}>{Array(count).fill('🍓')}</div>;
};

export default Strawberry;
