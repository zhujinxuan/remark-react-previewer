import React, { Component } from "react";
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
      let parentProps = {
        style: {},
        ...vdom.props
      };

      if (this.state.scrolled) {
        parentProps.style = Object.assign(
          {},
          parentProps.style,
          this.props.styles.scrolled
        );
        if (typeof vdom.tag === "string") {
          parentProps = {
            ...parentProps,
            ref: this.props.setScroll
          };
        } else {
          parentProps = {
            ...parentProps,
            refDOM: this.props.setScroll
          };
        }
      }

      if (typeof vdom.tag !== "string") {
        parentProps = { ...parentProps, styles: this.props.styles };
      }

      let children = null;
      if (this.props.node.children) {
        children = this.props.node.children.map(child =>
          compile({ ...this.props, node: child })
        );
      }

      if (vdom.before) {
        children = [vdom.before, ...children];
      }

      return React.createElement(vdom.tag, parentProps, children);
    }
  };
}

function mapNodeToVDOMRoot(props) {
  let vdom = VDOMs[props.node.type](props);

  let newProps = {
    style: Object.assign({}, props.styles[vdom.tag], vdom.style)
  };

  return {
    ...vdom,
    node: props.node,
    props: { ...newProps, ...vdom.props }
  };
}

function isVDom(props) {
  return VDOMs[props.node.type] !== undefined;
}

export default createChildComponent;
export { isVDom, createChildComponent };
