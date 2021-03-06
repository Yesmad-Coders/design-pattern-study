# Provider Pattern

## Definition

- 여러 컴포넌트에서 data에 접근이 가능하도록 함
- 모든 컴포넌트를 Provider 안에 wrap 가능
- Provider에 value props 통해 값 전달

```js
const DataContext = React.createContext()

function App() {
  const data = { ... }

  return (
    <div>
      <DataContext.Provider value={data}>
        <SideBar />
        <Content />
      </DataContext.Provider>
    </div>
  )
}
```

- useContext(createContext()) 통해 접근

```js
const DataContext = React.createContext();

function App() {
  const data = { ... }

  return (
    <div>
      <SideBar />
      <Content />
    </div>
  )
}

const SideBar = () => <List />
const List = () => <ListItem />
const Content = () => <div><Header /><Block /></div>


function ListItem() {
  const { data } = React.useContext(DataContext);
  return <span>{data.listItem}</span>;
}

function Text() {
  const { data } = React.useContext(DataContext);
  return <h1>{data.text}</h1>;
}

function Header() {
  const { data } = React.useContext(DataContext);
  return <div>{data.title}</div>;
}
```

- Global data 공유 시에 유용(eg. light/dark mode theme)

## Hooks

- Context provide 하는 custom hoook 생성 가능

```js
function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return theme;
}
```

- HigherOrderComponent 활용하여 children 감싸기

```js
unction ThemeProvider({children}) {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const providerValue = {
    theme: themes[theme],
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function App() {
  return (
    <div className={`App theme-${theme}`}>
      <ThemeProvider>
        <Toggle />
        <List />
      </ThemeProvider>
    </div>
  );
}
```

## Pros

- Cascade 로 props를 내리지않아도 많은 components에 data 제공 가능
- Refactoring 용이
- Data flow 를 이해하기 쉬워짐

## Cons

- 과도한 Provider pattern 사용은 성능 이슈 야기
  - 해당 context 사용하는 모든 component는 global state 변화 시마다 re-render
  - 이슈 방지 위해 용도별 분리된 provider 사용 필요

## Case study

### 1. Redux Provider

- Provider > ReactReduxContext

```js
// Provider.js
function Provider({ store, context, children }) {
  const contextValue = useMemo(() => {
    const subscription = createSubscription(store);
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store,
      subscription,
    };
  }, [store]);

  const previousState = useMemo(() => store.getState(), [store]);

  useIsomorphicLayoutEffect(() => {
    const { subscription } = contextValue;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);

  const Context = context || ReactReduxContext;

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
```

```js
// Context.js
import React from "react";

export const ReactReduxContext = /*#__PURE__*/ React.createContext(null);

if (process.env.NODE_ENV !== "production") {
  ReactReduxContext.displayName = "ReactRedux";
}

export default ReactReduxContext;
```

### 2. Apollo Provider

- ApolloProvider > getApolloContext

```js
// ApolloProvier.js
import { invariant } from "../../utilities/globals/index.js";
import * as React from "react";
import { getApolloContext } from "./ApolloContext.js";
export var ApolloProvider = function (_a) {
  var client = _a.client,
    children = _a.children;
  var ApolloContext = getApolloContext();
  return React.createElement(ApolloContext.Consumer, null, function (context) {
    if (context === void 0) {
      context = {};
    }
    if (client && context.client !== client) {
      context = Object.assign({}, context, { client: client });
    }
    __DEV__
      ? invariant(
          context.client,
          "ApolloProvider was not passed a client instance. Make " +
            'sure you pass in your client via the "client" prop.'
        )
      : invariant(context.client, 26);
    return React.createElement(
      ApolloContext.Provider,
      { value: context },
      children
    );
  });
};
```

```js
// ApooloContext.js
import * as React from "react";
import { canUseSymbol } from "../../utilities/index.js";
var contextKey = canUseSymbol
  ? Symbol.for("__APOLLO_CONTEXT__")
  : "__APOLLO_CONTEXT__";
export function getApolloContext() {
  var context = React.createContext[contextKey];
  if (!context) {
    Object.defineProperty(React.createContext, contextKey, {
      value: (context = React.createContext({})),
      enumerable: false,
      writable: false,
      configurable: true,
    });
    context.displayName = "ApolloContext";
  }
  return context;
}
export { getApolloContext as resetApolloContext };
```
