const getId = (items = []) => {
  let max = 0;
  items.forEach(({ id }) => {
    if (id > max) {
      max = id;
    }
  });
  return max + 1;
};

export const clickAddButtonHandler = function (event) {
  event.preventDefault();

  const messageInput = this._root.querySelector("#message-input");
  const inputValue = messageInput.value;

  messageInput.value = ""; // message input 초기화

  const { value: selectValue } = this._root.querySelector(
    "#message-input-select"
  );

  const endTime = Date.now() + parseInt(selectValue) * 1000;

  const listState = this._injection["messageList"].state;

  listState["items"] = [
    ...listState["items"],
    {
      message: inputValue,
      endTime,
      id: getId(listState["items"]),
    },
  ];
};
