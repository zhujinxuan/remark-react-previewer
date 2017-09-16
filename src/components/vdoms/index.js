import React from "react";

const paragraph = {
  outlineParagraph: props => ({ tag: "p" })
};
const list = {
  list: props => ({ tag: props.node.ordered ? "ol" : "ul" }),
  listItem: props => {
    let result = { tag: "li" };
    if (props.node.checked !== undefined) {
      result.before = (
        <input
          key={"checkbox"}
          type={"checkbox"}
          onClick={() => false}
          checked={props.node.checked}
        />
      );
    }
    return Object.assign({}, result);
  }
};
const table = {
  table: props => ({ tag: "table" }),
  tableRow: props => ({ tag: "tr" }),
  tableCell: props => ({ tag: "th" })
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
      title: props.node.title
    }
  }),
  linkReference: props => {
    let definitionNode = props.getDefinition[props.node.identifier];
    return {
      tag: "a",
      props: {
        title: definitionNode.title
      }
    };
  }
};
const VDOMs = {
  ...paragraph,
  ...list,
  ...table,
  ...image,
  ...link
};
export default VDOMs;
