import React from "react";
import Record from "../Record";
import styles from "./style.module.css";

function RecordGrid({ allRecords, filteredRecords, updateRecords }) {
  const records = filteredRecords ? filteredRecords : allRecords;
  return (
    <div className={styles.container}>
      {records.map((record, i) => {
        return (
          <Record
            key={i}
            record={record}
            allRecords={allRecords}
            updateRecords={updateRecords}
            isLast={i === records.length - 1}
          />
        );
      })}
    </div>
  );
}

export default RecordGrid;
