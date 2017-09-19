import React from "react";
import { render } from "react-dom";
// import vfile from "vfile";
import Previewer from "../src/index.js";
import mdString from "./Example.md";
console.log(mdString);

// let mdFile = vfile("Example.md");
// let mdString = "# Hello";

let cursorPosition = { column: 1, line: 10 };

let container = document.createElement("div");
document.body.appendChild(container);
render(
  <Previewer markdown={mdString} cursorPosition={cursorPosition} />,
  container
);
