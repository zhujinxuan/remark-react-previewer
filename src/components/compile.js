import keyGen from "./keyGen.js";
import React from "react";
import createChildComponent, { isVDom } from "./Child.js";

const InlineNodes = {
  text: props => props.node.value,
  inlineCode: props => (
    <code key={keyGen(props.node)} style={props.styles.code}>
      {props.node.value}
    </code>
  ),
  YAML: props => null,
  HTML: props => null,
  thematicBreak: props => (
    <hr
      key={keyGen(props.node)}
      style={props.styles.hr}
      ref={props.node === props.cursorNode ? props.setScroll : null}
    />
  ),
  break: props => <br key={keyGen(props.node)} />,
  footnoteReference: props => null,
  definition: props => null,
  footnoteDefinition: props => null
};

function renderInline(props) {
  let { node } = props;
  if (InlineNodes[node.type]) {
    return InlineNodes[node.type](props);
  }
  return undefined;
}

let Child = createChildComponent(compile);

function compile(props) {
  let result = renderInline(props);
  let { node } = props;
  if (result !== undefined) {
    return result;
  }
  if (node.type === "paragraph") {
    return node.children.map(child => compile({ ...props, node: child }));
  }

  if (props.node.type === "ImageReference") {
    console.log(isVDom(props));
  }

  if (isVDom(props)) {
    return <Child key={keyGen(props.node)} {...props} />;
  }
  return null;
}

export default compile;
