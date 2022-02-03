import Dom from "../../utils/dom.js";
import type from "../../utils/type.js";

const getPrev = (value) => {
  if (value === undefined) return null;
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return [...value];
    } else {
      return { ...value };
    }
  } else {
    return value;
  }
};

const Component = class {
  _root = null;
  _rootId = "";
  _template = "";
  _injection = {}; // 의존성 주입된 컴포넌트
  state = {};

  constructor(_state = {}, _ = type(_state, "object")) {
    let self = this;

    // Proxy를 이용해서 상태 추적
    this.state = new Proxy(_state, {
      set(state, key, value) {
        const prev = getPrev(state[key]);
        state[key] = value;
        self._update(key, value, prev);
        return true;
      },
    });

    return new Proxy(this, {
      set(target, key, value) {
        const prev = getPrev(target[key]);
        target[key] = value;
        if (key === "state") {
          self._update(key, value, prev);
        }
        return true;
      },
    });
  }

  init({ rootId, className, tag = "div" }) {
    setTimeout(this.render.bind(this));
    this._rootId = rootId;
    return `<${tag} ${
      className ? `class="${className}"` : ""
    } id="${rootId}"></${tag}>`;
  }

  render() {
    if (this._root === null) {
      this._root = document.querySelector(`#${this._rootId}`);
    }
    Dom.print(this._root, this._template);
    this._didMount();
  }

  inject(
    key,
    component,
    _ = type(key, "string"),
    __ = type(component, Component)
  ) {
    // 외부 컴포넌트로부터 의존성 주입
    this._injection[key] = component;
  }

  _update() {}

  _didMount() {}
};

export default Component;
