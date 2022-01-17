import React from "react";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <main>
      <title>Home</title>
      <h1>Home</h1>
      <Link to="/singleton">싱글톤 패턴</Link>
    </main>
  );
};

export default IndexPage;
