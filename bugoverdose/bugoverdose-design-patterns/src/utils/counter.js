let count = 0;

const counter = {
  getCount() {
    return count;
  },
  increment() {
    return ++count; // count를 1만큼 증가시키고 반환. // cf) count++는 현재값 반환 후 1만큼 증가.
  },
  decrement() {
    return --count;
  },
};

Object.freeze(counter);

export { counter };
