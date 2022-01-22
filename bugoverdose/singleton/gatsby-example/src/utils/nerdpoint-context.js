import React from "react";

export const NerdPointContext = React.createContext({
  nerdPoint: 0,
  increment: () => {},
  decrement: () => {},
});
