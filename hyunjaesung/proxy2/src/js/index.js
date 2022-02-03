import MessageInput from "./components/MessageInput/index.js";
import MessageList from "./components/MessageList/index.js";
import Dom from "./utils/dom.js";

const messageList = new MessageList();
const messageInput = new MessageInput();

messageInput.inject("messageList", messageList);

Dom.print(
  document.querySelector("#root"),
  `${messageInput.init({ rootId: "message-input-wrapper" })}${messageList.init({
    rootId: "message-list",
    tag: "ul",
  })}`
);
