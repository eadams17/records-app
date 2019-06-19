import React from "react";
import Record from "../Record";
import styles from "./style.module.css";

function RecordGrid({ records }) {
  return (
    <div className={styles.container}>
      {records.map((record, i) => {
        return (
          <Record key={i} record={record} isLast={i === records.length - 1} />
        );
      })}
    </div>
  );
}

export default RecordGrid;
