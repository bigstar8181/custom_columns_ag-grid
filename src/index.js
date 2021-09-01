import React from "react";
import ReactDOM from "react-dom";
import MyGrid from "./MyGrid";

function App() {
  return <MyGrid />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
