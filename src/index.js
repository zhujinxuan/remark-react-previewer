import React, { Component } from "react";
import remarkParse from "remark-parse";
import unified from "unified";
import findNode from "unist-find-node";

import Root from "./components/Root.js";
import PropTypes from "prop-types";
import normalizeMDAST from "./normalize.js";
import defaultStyles from "./defaultStyles.js";
import mergeState from "mergeState";

class Previewer extends Component {
  static propTypes: {
    cursorPosition: PropTypes.object,
    markdown: PropTypes.string,
    styles: PropTypes.object
  };
  static defaultProps: {
    styles: defaultStyles
  };

  constructor(props) {
    super(props);
    this.propsState = {
      mdast: {},
      definitions: {},
      scrollTop: 0,
      scrollNode: null
    };
    this.constructMDAST(props);
    this.getDefinition = this.getDefinition.bind(this);

    this.ref = {
      main: null,
      scroll: null
    };
    this.setScroll = this.setScroll.bind(this);
    this.setMain = this.setMain.bind(this);
  }

  constructMDAST(props) {
    let mdast = unified()
      .use(remarkParse)
      .parse(this.props.markdown);
    let { definitions } = normalizeMDAST(mdast);
    this.propsState.definitions = definitions;
    this.propsState.mdast = mdast;
    this.propsState.scrollNode = findNode(
      this.propsState.mdast,
      this.props.cursorPosition
    );
    if (this.propsState.scrollNode.type === "root") {
      this.propsState.scrollNode = null;
    }
  }
  getDefinition(id) {
    return this.propsState.definitions[id];
  }

  setScroll(ref) {
    this.ref.scroll = ref;
  }
  setMain(ref) {
    this.ref.main = ref;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.markdown !== this.props.markdown) {
      this.constructMDAST();
    }
    this.propsState.scrollNode = findNode(
      this.propsState.mdast,
      nextProps.cursorPosition
    );
    if (this.propsState.scrollNode.type === "root") {
      this.propsState.scrollNode = null;
    }
  }
  autoScroll() {
    let { main, scroll } = this.ref;

    if (scroll) {
      let scrollTop = scroll.offsetTop - 40;
      main.scrollTop = scrollTop > 0 ? scrollTop : 0;
    }
  }
  componentDidMount() {
    console.log("Mount");
    this.autoScroll();
  }
  componentDidUpdate() {
    this.autoScroll();
  }
  render() {
    let { cursorPosition, styles } = this.props;
    if (cursorPosition.line < 0) {
      cursorPosition = null;
    }
    styles = mergeState(styles, defaultStyles);
    return (
      <Root
        mdast={this.propsState.mdast}
        cursorNode={this.propsState.scrollNode}
        styles={styles}
        setScroll={this.setScroll}
        setMain={this.setMain}
        getDefinition={this.getDefinition}
      />
    );
  }
}

export default Previewer;
