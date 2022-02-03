import Dom from "../../utils/dom.js";
import Component from "../common/Component.js";
import getItemTemplate from "./template.js";

const MessageItem = class extends Component {
  constructor({ message, endTime }) {
    super();
    this._template = getItemTemplate(message, endTime);
  }

  setLeftTime(leftTime) {
    const timeEl = this._root.querySelector(".message-item-time");
    Dom.control(timeEl, "PinnerText", ` 남은 시간 : ${leftTime} `);
  }
};

export default MessageItem;
