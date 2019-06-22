import React, { PureComponent } from "react";
import RecordInformation from "../RecordInformation";
import styles from "./style.module.css";
import { Modal, Button, ModalFooter } from "reactstrap";
import {
  updateArtistName,
  checkForMultipleArtistEntries,
  getRecordIndex
} from "../utils/helperFunctions";

class RecordUpdate extends PureComponent {
  state = {
    album: this.props.record.album_title,
    artist: this.props.record.artist.name,
    year: this.props.record.year,
    condition: this.props.record.condition
  };

  updateField = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  updateSingleRecord() {
    const { allRecords, record, updateRecords, toggle } = this.props;
    const { album, artist, year, condition } = this.state;
    const recordIndex = getRecordIndex(allRecords, record);

    let updatedRecords = allRecords;
    updatedRecords[recordIndex] = {
      album_title: album,
      artist: { name: artist, id: allRecords[recordIndex].artist.id },
      condition: condition,
      year: year
    };
    updateRecords(updatedRecords);
    toggle();
  }
  updateMultipleRecords() {
    const { allRecords, record, updateRecords, toggle } = this.props;
    const { album, artist, year, condition } = this.state;
    const alteredRecords = updateArtistName(allRecords, record, artist);
    const recordIndex = getRecordIndex(allRecords, record);

    let updatedRecords = alteredRecords;
    updatedRecords[recordIndex] = {
      album_title: album,
      artist: { name: artist, id: alteredRecords[recordIndex].artist.id },
      condition: condition,
      year: year
    };
    updateRecords(alteredRecords);
    toggle();
  }

  handleKeyPress(e) {
    e.key === "Enter" && this.handleSubmit();
  }

  handleSubmit = () => {
    const { allRecords, record } = this.props;
    const multipleEntriesExist = checkForMultipleArtistEntries(
      allRecords,
      record
    );
    const artistUpdated = this.state.artist !== this.props.record.artist.name;
    if (!artistUpdated || (artistUpdated && !multipleEntriesExist)) {
      this.updateSingleRecord();
    } else {
      this.updateMultipleRecords();
    }
  };

  render() {
    const { record, visible, toggle } = this.props;

    return (
      <Modal
        isOpen={visible}
        toggle={toggle}
        className={styles.modal}
        onKeyPress={e => this.handleKeyPress(e)}
      >
        <div className={styles.container}>
          <div className={styles.iconContainer}>
            <i
              tabIndex="0"
              id={styles.closeIcon}
              className="fa fa-times-circle fa-lg"
              onClick={toggle}
            />
          </div>
          <i className="fas fa-compact-disc fa-9x fa-spin" />
          <RecordInformation
            record={record}
            updateField={this.updateField}
            insideModal={true}
          />
          <ModalFooter className={styles.buttonsContainer}>
            <Button className={styles.button} onClick={this.handleSubmit}>
              Save
            </Button>
            <Button className={styles.button} onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    );
  }
}

export default RecordUpdate;
