import React, { PureComponent } from "react";
import styles from "./style.module.css";
import humanizeString from "humanize-string";
import { Input } from "reactstrap";
import { renderIcons } from "../utils/helperFunctions.js";

class RecordInformation extends PureComponent {
  render() {
    const { record, insideModal, updateField, errors } = this.props;
    const condition = humanizeString(record.condition);
    const labelStyle = insideModal ? styles.modalLabel : styles.label;

    return (
      <div className={styles.detailsContainer}>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-compact-disc" />
            <li className={labelStyle}>Album</li>
          </div>
          {!insideModal && (
            <li id={styles.album} className={styles.info}>
              {record.album_title}
            </li>
          )}
          {insideModal && (
            <div className={styles.inputContainer}>
              <Input
                defaultValue={record.album_title}
                className={styles.infoModal}
                onChange={value => updateField(value, "album")}
              />
              {errors && errors["album"] && (
                <p className={styles.error}>{errors["album"]}</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-user-circle" />
            <li className={labelStyle}>Artist</li>
          </div>
          {!insideModal && (
            <li className={styles.info}>{record.artist.name}</li>
          )}
          {insideModal && (
            <div className={styles.inputContainer}>
              <Input
                defaultValue={record.artist.name}
                className={styles.infoModal}
                onChange={value => updateField(value, "artist")}
              />
              {errors && errors["artist"] && (
                <p className={styles.error}>{errors["artist"]}</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="far fa-calendar-alt" />
            <li className={labelStyle}> Year</li>
          </div>
          {!insideModal && <li className={styles.info}>{record.year}</li>}
          {insideModal && (
            <div className={styles.inputContainer}>
              <Input
                defaultValue={record.year}
                className={styles.infoModal}
                onChange={value => updateField(value, "year")}
              />
              {errors && errors["year"] && (
                <p className={styles.error}>{errors["year"]}</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-heartbeat" />
            <li className={labelStyle}>Condition</li>
          </div>
          <div
            id={insideModal ? styles.modalCondition : {}}
            className={styles.conditionContainer}
          >
            {!insideModal && (
              <li id={styles.condition} className={styles.info}>
                {condition}
              </li>
            )}
            {insideModal && (
              <div className={styles.inputContainer}>
                <Input
                  defaultValue={humanizeString(record.condition)}
                  className={styles.infoModal}
                  onChange={value => updateField(value, "condition")}
                />
                {errors && errors["condition"] && (
                  <p className={styles.error}>{errors["condition"]}</p>
                )}
              </div>
            )}
            {!insideModal && (
              <div className={styles.conditionContainer}>
                {renderIcons(condition)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RecordInformation;
