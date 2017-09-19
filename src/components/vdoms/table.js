import React, { Component } from "react";

class TableRoot extends Component {
  render() {
    return (
      <table {...this.props}>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}
const table = {
  table: props => ({
    tag: TableRoot
  }),
  tableRow: props => ({ tag: "tr" }),
  tableCell: props => ({ tag: "th" })
};

export default table;
