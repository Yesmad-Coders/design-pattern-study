import Component from "../common/Component.js";
import { clickAddButtonHandler } from "./handlers.js";
import getInputTemplate from "./template.js";

const MessageInput = class extends Component {
  constructor() {
    super();
    this._template = getInputTemplate();
  }

  _didMount() {
    this._root
      .querySelector("#message-input-button")
      .addEventListener("click", clickAddButtonHandler.bind(this));
  }
};

export default MessageInput;
