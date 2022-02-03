// domController (el, "Aclass", "base", "PinnerHTML", "abc");

const domController = (el, ...arg) => {
  let k = "";
  arg.forEach((it) => {
    if (k === "") {
      k = it;
    } else {
      switch (k[0]) {
        case "A": // Attribute setter
          el.setAttribute(k.substr(1), it);
          break;
        case "P": // Property setter
          if (k.substr(1) === "classList") {
            if (el.classList.contains(it)) {
              el.classList.remove(it);
            } else {
              el.classList.add(it);
            }
          } else {
            el[k.substr(1)] = it;
          }
          break;
        default:
          // Style setter
          el.style[k] = it;
      }
      k = "";
    }
  });
  return el;
};

const Dom = {
  print(el, tmpl) {
    domController(el, "PinnerHTML", tmpl);
  },
  control(el, ...arg) {
    domController(el, ...arg);
  },
  insertBefore({ root, className, index, newEl }) {
    const child = root.querySelectorAll(`.${className}`);
    root.insertBefore(newEl, child[index]);
  },
};

export const createElementFromHtmlString = (htmlString) => {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  return div.firstChild;
};

export default Dom;
