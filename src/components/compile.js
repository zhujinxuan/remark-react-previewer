import keyGen from "./keyGen.js";
import React from "react";
import createChildComponent, { isVDOM } from "./Child.js";

const InlineNodes = {
  text: props => props.node.value,
  InlineCode: props => (
    <code key={keyGen(props.node)} style={props.styles.code}>
      props.node.value
    </code>
  ),
  YAML: props => null,
  HTML: props => null,
  ThematicBreak: props => (
    <hr key={keyGen(props.node)} style={props.styles.hr} />
  ),
  Break: props => <br />,
  LinkReference: props => null,
  ImageReference: props => null,
  FootnoteReference: props => null,
  Definition: props => null,
  FootnoteDefinition: props => null
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
  if (isVDOM(props)) {
    return <Child {...props} />;
  }
  return null;
}

export default compile;
