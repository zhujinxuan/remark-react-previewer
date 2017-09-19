import React from "react";
import compile from "./compile.js";

const Root = props => {
  let defaultStyle = Object.assign({ overflow: scroll }, props.styles.root);
  return (
    <div style={defaultStyle} ref={props.setMain}>
      {props.mdast.children.map(child =>
        compile({
          ...props,
          node: child
        })
      )}
    </div>
  );
};

export default Root;
