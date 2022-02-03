import { getLeftTime } from "../../utils/time.js";

const getNewEndTime = (selectValue, button, targetItem) => {
  let newEndTime = 0;

  // 시간 변경
  if (button.classList.contains("increase")) {
    // 시간 추가
    if (selectValue[0] === "x") {
      const leftTime =
        getLeftTime(targetItem.endTime) *
        parseInt(selectValue.substring(1)) *
        1000;
      newEndTime = Date.now() + leftTime;
    } else {
      newEndTime = targetItem.endTime + parseInt(selectValue * 1000) + 1000;
    }
  } else {
    // 시간 감소
    newEndTime = targetItem.endTime - parseInt(selectValue * 1000);
  }
  return newEndTime;
};

const setEndTime = function (selectValue, button, id) {
  const index = this.state.items.findIndex((item) => item.id === id);
  const targetItem = this.state.items[index];

  targetItem.endTime = getNewEndTime(selectValue, button, targetItem);

  if (getLeftTime(targetItem.endTime) < 1) {
    // 0 이하로 남을시 item 삭제
    this._removeItem(id);
  } else {
    // item 삭제 및 재추가
    this._arrangeItem(targetItem);
  }
};

export const clickItemButtonHandler = function (event) {
  const button = event.target.closest(".message-item-button");
  if (button === null) return;
  const wrapper = event.target.closest(".message-item-button-wrapper");

  const id = parseInt(
    event.target.closest(".message-item").id.replace("message-item-", "")
  );

  if (
    button.classList.contains("increase") ||
    button.classList.contains("decrease")
  ) {
    // 시간 추가, 시간 감소 버튼
    setEndTime.bind(this)(wrapper.children[0].value, button, id);
  } else if (button.classList.contains("delete")) {
    // 삭제 버튼
    this._removeItem(id);
  }
};

export const intervalHandler = function () {
  const items = this.state.items;

  if (items.length < 1) {
    // 인터벌 해제
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    console.log("clear interval");
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const leftTime = getLeftTime(item.endTime);
    if (leftTime < 1) {
      // 시간 다 된경우
      this._removeItem(item.id);
    } else {
      // 1초씩 변화
      this._injection[item.id].setLeftTime(leftTime);
    }
  }
};
