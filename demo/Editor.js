import React, { Component } from "react";
import Previewer from "../src/index.js";
import mdString from "./Example.md";

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      value: mdString,
      position: { line: 1, column: 1 }
    };
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  handleTextAreaChange(value, position) {
    this.setState({ value, position });
  }

  render() {
    return (
      <div style={{ height: "600px" }}>
        <TA
          value={this.state.value}
          position={this.state.position}
          onChange={this.handleTextAreaChange}
        />
        <Previewer
          styles={{ root: { width: "40%" } }}
          markdown={this.state.value}
          cursorPosition={this.state.position}
        />
      </div>
    );
  }
}

const textAreaStyle = {
  backgroundColor: "#282828",
  width: "40%",
  height: "100%",
  color: "white",
  display: "inline-block"
};
class TA extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    let textToCursor = e.target.value
      .substr(0, e.target.selectionStart)
      .split("\n");
    let line = textToCursor.length;
    let column = textToCursor[textToCursor.length - 1].length + 1;
    let position = { line, column };
    this.props.onChange(value, position);
  }

  render() {
    return (
      <textarea
        style={textAreaStyle}
        value={this.props.value}
        onClick={this.handleChange}
        onFocus={this.handleChange}
        onKeyUp={this.handleChange}
        onChange={this.handleChange}
      />
    );
  }
}

export default Editor;
