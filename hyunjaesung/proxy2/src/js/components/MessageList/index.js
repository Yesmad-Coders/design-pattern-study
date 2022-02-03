import Dom, { createElementFromHtmlString } from "../../utils/dom.js";
import Component from "../common/Component.js";
import MessageItem from "../MessageItem/index.js";
import { clickItemButtonHandler, intervalHandler } from "./handlers.js";

const MessageList = class extends Component {
  constructor() {
    super({ items: [] });
  }

  _update(key, value, prev) {
    if (key === "items" && (prev === null || prev.length < value.length)) {
      this._addItem();
    }
  }

  _addItem() {
    const newItem = this.state.items[this.state.items.length - 1];

    const index = this.state.items.findIndex(
      ({ endTime }) => newItem.endTime > endTime
    );

    const messageItem = new MessageItem(newItem);
    this.inject(`${newItem.id}`, messageItem); // item 을 list에 주입

    const newEl = createElementFromHtmlString(
      messageItem.init({
        tag: "li",
        rootId: `message-item-${newItem.id}`,
        className: "message-item",
      })
    );

    Dom.insertBefore({
      className: "message-item",
      newEl,
      index,
      root: this._root,
    });

    this.state.items.sort(
      ({ endTime }, { endTime: endTime2 }) => endTime2 - endTime
    );

    if (this.intervalId === undefined) {
      this._setTimeChecker();
    }
  }

  _removeItem(id) {
    // state 에서 지우기
    const items = this.state.items;
    const index = items.findIndex((item) => item.id === id);
    if (index < 0) return;
    items.splice(index, 1);

    // _injection에서 지우기
    delete this._injection[`${id}`];

    // dom 에서 지우기
    this._root.querySelector(`#message-item-${id}`).remove();
  }

  _arrangeItem({ message, endTime, id }) {
    // 재정렬을 위해 삭제 후 재추가
    this._removeItem(id);
    this.state.items = [
      ...this.state.items,
      {
        message,
        endTime,
        id,
      },
    ];
  }

  _setTimeChecker() {
    this.intervalId = setInterval(intervalHandler.bind(this), 1000);
  }

  _didMount() {
    this._root.addEventListener("click", clickItemButtonHandler.bind(this));
  }
};

export default MessageList;
