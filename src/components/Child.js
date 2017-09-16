import React, { Component } from "react";
import keyGen from "./keyGen.js";
import VDOMs from "./vdoms/index.js";

// @node, node
// @styles, for styles
// @unChanged, whether changed
// @cursorNode node
// @setScroll
function createChildComponent(compile) {
  return class Child extends Component {
    constructor(props) {
      super(props);
      this.state = { scrolled: props.node === props.cursorNode };
    }
    componentWillReceiveProps(nextProps) {
      this.setState({ scrolled: nextProps.node === nextProps.cursorNode });
    }
    render() {
      let vdom = mapNodeToVDOMRoot(this.props);
      let props = {
        ...vdom.props,
        key: keyGen(this.props.node)
      };
      let children = props.node.children.map(child =>
        compile({ node: child, ...this.props })
      );
      if (vdom.before) {
        children = [vdom.before, ...children];
      }
      return React.createElement(vdom.tag, props, children);
    }
  };
}

function mapNodeToVDOMRoot(props) {
  let vdom = VDOMs[props.node.type];
  let { tag, before, style } = vdom.tag;
  let newProps = {
    style: Object.assign({}, props.styles[vdom.tag], style)
  };
  return Object.assign({}, { tag, before }, { props: newProps });
}

function isVDom(props) {
  return VDOMs[props.node.type] === undefined;
}

export default createChildComponent;
export { isVDom, createChildComponent };
