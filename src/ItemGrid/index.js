import React, { PureComponent } from "react";
import Item from "../Item";
import styles from "./style.module.css";

class ItemGrid extends PureComponent {
  render() {
    const { records } = this.props;
    return (
      <div className={styles.container}>
        {records.map((record, i) => {
          return <Item key={i} record={record} />;
        })}
      </div>
    );
  }
}

export default ItemGrid;
