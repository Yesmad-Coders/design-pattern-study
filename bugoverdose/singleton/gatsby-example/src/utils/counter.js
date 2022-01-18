let count = 0; // 이처럼 전역 스코프에서 상태관리하는 방식은 안티패턴

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

Object.freeze(counter); // 객체의 수정 방지

export { counter };
