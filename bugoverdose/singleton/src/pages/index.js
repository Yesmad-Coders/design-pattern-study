import React from "react";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <main>
      <title>Home</title>
      <h1>Home</h1>
      <li>
        <Link to="/vanilla">Singleton 바닐라JS</Link>
      </li>
      <li>
        <Link to="/state">Singleton State - useState and useContext</Link>
      </li>
    </main>
  );
};

export default IndexPage;
