import React, { Component } from "react";

class CodeRoot extends Component {
  render() {
    let { ref, key } = this.props;
    return (
      <pre {...{ ref, key }}>
        <code className={"hljs " + this.props.lang}>{this.props.value}</code>
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
