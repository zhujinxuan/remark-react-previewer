import React, { Component } from "react";

class TableRoot extends Component {
  render() {
    let { key, style, styles } = this.props;

    return (
      <table
        ref={this.props.refDOM}
        key={key}
        style={{ ...styles.table, ...style }}
      >
        <tbody style={styles.tbody}>{this.props.children}</tbody>
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
