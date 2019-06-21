import React, { PureComponent } from "react";
import styles from "./style.module.css";
import humanizeString from "humanize-string";
import { Input } from "reactstrap";
import { renderIcons } from "../utils/helperFunctions.js";

class RecordInformation extends PureComponent {
  render() {
    const { record, insideModal, updateField } = this.props;
    const condition = humanizeString(record.condition);
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-compact-disc" />
            <li className={styles.label}>Album</li>
          </div>
          {!insideModal && (
            <li id={styles.album} className={styles.info}>
              {record.album_title}
            </li>
          )}
          {insideModal && (
            <Input
              defaultValue={record.album_title}
              className={styles.info}
              onChange={value => updateField(value, "album")}
            />
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-user-circle" />
            <li className={styles.label}>Artist</li>
          </div>
          {!insideModal && (
            <li className={styles.info}>{record.artist.name}</li>
          )}
          {insideModal && (
            <Input
              defaultValue={record.artist.name}
              className={styles.info}
              onChange={value => updateField(value, "artist")}
            />
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="far fa-calendar-alt" />
            <li className={styles.label}> Year</li>
          </div>
          {!insideModal && <li className={styles.info}>{record.year}</li>}
          {insideModal && (
            <Input
              defaultValue={record.year}
              className={styles.info}
              onChange={value => updateField(value, "year")}
            />
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-heartbeat" />
            <li className={styles.label}>Condition</li>
          </div>
          <div className={styles.conditionContainer}>
            {!insideModal && (
              <li id={styles.condition} className={styles.info}>
                {condition}
              </li>
            )}
            {insideModal && (
              <Input
                defaultValue={record.condition}
                className={styles.info}
                onChange={value => updateField(value, "condition")}
              />
            )}
            <div>{renderIcons(condition)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecordInformation;
