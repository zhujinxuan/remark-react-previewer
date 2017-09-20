import React, { Component } from "react";

class CodeRoot extends Component {
  render() {
    let { key, style, styles } = this.props;
    return (
      <pre
        ref={this.props.refDOM}
        key={key}
        style={{ ...styles.pre, ...style }}
      >
        <code
          style={this.props.styles.code}
          className={"hljs " + this.props.lang}
        >
          {this.props.value}
        </code>
      </pre>
    );
  }
}
const code = {
  code: props => ({
    tag: CodeRoot,
    props: {
      lang: props.node.lang,
      value: props.node.value
    }
  })
};

export default code;
