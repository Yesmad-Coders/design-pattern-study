# provider pattern

- 응용프로그램의 전부 구성요소에서 데이터를 사용할 수 있도록 할때 props를 오로지 하위 컴포넌트로 전달하는 용도로만 쓰이는 컴포넌트들을 거치면서 React Component트리의 한부분에서 다른 부분으로 데이터를 전달할 수 있다.
    - 이를 **Prop Drilling**이라고 한다. 
- 이러한 방식은 해당 prop이 어디에서 왔는지 확인하기 어렵고 하위 레벨이 커질수록 코드를 파악하기도 유지보수하기도 어렵다. 

```jsx
function App() {
  const data = { ... }

  return (
    <div>
      <SideBar data={data} />
      <Content data={data} />
    </div>
  )
}

const SideBar = ({ data }) => <List data={data} />
const List = ({ data }) => <ListItem data={data} />
const ListItem = ({ data }) => <span>{data.listItem}</span>

const Content = ({ data }) => (
  <div>
    <Header data={data} />
    <Block data={data} />
  </div>
)
const Header = ({ data }) => <div>{data.title}</div>
const Block = ({ data }) => <Text data={data} />
const Text = ({ data }) => <h1>{data.text}</h1>
```

- 이러한 Prop Driling의 문제점을 Provider Pattern을 사용하여 보완할 수 있다. 
- Provider패턴은 다수의 컴포턴트에서 사용가능한 일반적인 객체를 만기를 원하고, 그 객체가 변할때 마다 자식컴포턴트들이 업데이트 되길 원할 때 유용하다. 
- 이 패턴의 주요한 이점은 트리내의 컴포넌트마다 각각 다 props로 값을 넘겨야하는 상황을 피할 수 있다는 것이다. 
- props를 통해 해당 데이터를 각 레이어 아래로 전달하는 대신에 우리는 모든 컴포턴트를 프로바이더로 래핑할 수 있다. 
- provider는 context객체가 제공하는 고차 구성요소로 React가 제공하는 createContext메소드를 사용하여 Context객체를 만들 수 있다. 

```jsx
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
- Provider패턴을 사용하면 각 구성 요소에 데이터를 각각 전달하지 않아도 된다. 
- 각 구성요소는 useContext hook을 사용하여 데이터에 엑세스 할 수 있다. 

```jsx
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

- Provider Pattern은 전역 데이터를 공유하는데 매우 유용합니다.
```jsx
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
```

- 현재 테마값을 각 구성요소에 전달하는 대신 구성요소로 래핑하고 ThemeProvider현재 테마색상을 공급자에게 전달할 수 있다. 
```jsx
export const ThemeContext = React.createContext();

const themes = {
  light: {
    background: "#fff",
    color: "#000"
  },
  dark: {
    background: "#171717",
    color: "#fff"
  }
};

export default function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const providerValue = {
    theme: themes[theme],
    toggleTheme
  };

  return (
    <div className={`App theme-${theme}`}>
      <ThemeContext.Provider value={providerValue}>
        <Toggle />
        <List />
      </ThemeContext.Provider>
    </div>
  );
}
```
- toggle구성요소내에서 toggleTheme함수를 사용하여 그에 따라 테마를 업데이트 할 수 있다.
```jsx
import React, { useContext } from "react";
import { ThemeContext } from "./App";

export default function Toggle() {
  const theme = useContext(ThemeContext);

  return (
    <label className="switch">
      <input type="checkbox" onClick={theme.toggleTheme} />
      <span className="slider round" />
    </label>
  );
}
```


## Hook
- 구성요소에 컨텍스트를 제공하는 hook을 만들 수 있다. 
    - 각 구성요소에서 컨텍스트를 가져오는 대신 useContext에 필요한 컨텍스트를 반환하는 후크를 사용할 수 있다. 
```jsx
function useThemeContext() {
  const theme = useContext(ThemeContext);
  return theme;
}
```
- 이 테마가 유요한지확인하기 위해 useContext(ThemeContext)가 false값을 반환하는 경우 오류가 발생된다. 
```jsx
function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return theme;
}
```
- ThemeContext.Provider컴포넌트를 컴포넌트에 직접 래핑하는 대신에, 우리는 component를 래핑하여 값을 제공하는 훅을 생성할 수 있따. 
- 이 경우 렌더링 컴포넌트에서 컨텍스트 로직을 분리하여 Provider의 재사용 가능성을 높일 수 있다. 
```jsx
function ThemeProvider({children}) {
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

- useThemeContext Hook
```jsx
export default function TextBox() {
  const theme = useThemeContext();

  return <li style={theme.theme}>...</li>;
}
```

## 장점 
- Provider패턴을 사용하면 각 컴포넌트를 계층을 통해 데이터를 전달할 필요없이 많은 구성 요소에 데이터를 전달 할 수 있따. 
- 코드를 리팩토링하기 쉽다. 
- 안티패턴인 prop-drilling을 처리할 필요가 없다. 
- 구성요소에 이 전역상태에 대한 액세스 권한을 부여할 수 있으므로 Provider패턴을 사용하면 일종의 전역상태를 쉽게 유지 할 수 있다. 

## 단점 
- Provider패턴을 과도하게 사용하면 성능 문제가 발생할 수 있다. 
    - 컨텍스트를 사용하는 모든 컴포넌트는 각 상태변경시 다시 렌더링 된다. 
- 불필요한 값까지 업데이트 될 수 있는 Provider를 사용하지 않으려면 각 개별 사례에 대해 여러 공급자를 만들 수 있다.