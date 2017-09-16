import React, { Component } from "react";
import compile from "./compile.js";

class Root extends Component {
  constructor(props) {
    super(props);
    this.refs = {
      scrollToElem: null
    };
    this.setScrollHeight = this.setScrollHeight.bind(this);
  }

  render() {
    let props = this.props;
    let defaultStyle = Object.assign({ overflow: scroll }, props.styles.div);
    return (
      <div style={defaultStyle} ref={props.setMain}>
        {props.node.children.map(child =>
          compile({
            ...props,
            node: child
          })
        )}
      </div>
    );
  }
}

export default Root;
