import React from "react";
import table from "./table.js";
import code from "./code.js";

const heading = {
  heading: props => ({ tag: `h${props.node.depth}` })
};
const paragraph = {
  outlineParagraph: props => ({ tag: "p" })
};

const list = {
  list: props => ({ tag: props.node.ordered ? "ol" : "ul" }),
  listItem: props => {
    let result = { tag: "li" };
    if (props.node.checked !== undefined) {
      let checkBoxProps = {
        key: "checkbox",
        type: "checkbox",
        onClick: () => false,
        checked: props.node.checked,
        disabled: true
      };
      result.before = <input {...checkBoxProps} />;
    }
    return Object.assign({}, result);
  }
};
const image = {
  image: props => ({
    tag: "img",
    props: {
      alt: props.node.alt,
      title: props.node.title,
      href: props.node.url
    }
  }),
  ImageReference: props => {
    let definitionNode = props.getDefinition[props.node.identifier];
    return {
      tag: "img",
      props: {
        alt: props.node.alt,
        title: definitionNode.title,
        href: definitionNode.url
      }
    };
  }
};

const link = {
  link: props => ({
    tag: "a",
    props: {
      title: props.node.title,
      href: props.node.url
    }
  }),
  linkReference: props => {
    let definitionNode = props.getDefinition(props.node.identifier);
    console.log(definitionNode);
    return {
      tag: "a",
      props: {
        title: definitionNode.title,
        href: definitionNode.url
      }
    };
  }
};
const blockquote = {
  blockquote: props => ({
    tag: "blockquote"
  })
};
const inline = {
  emphasis: props => ({ tag: "em" }),
  strong: props => ({ tag: "strong" }),
  delete: props => ({ tag: "s" })
};
const VDOMs = {
  ...heading,
  ...paragraph,
  ...list,
  ...table,
  ...image,
  ...link,
  ...blockquote,
  ...code,
  ...inline
};
export default VDOMs;
