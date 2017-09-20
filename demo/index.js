import React from "react";
import { render } from "react-dom";
import Editor from "./Editor.js";

let container = document.createElement("div");
document.body.appendChild(container);
render(<Editor />, container);
