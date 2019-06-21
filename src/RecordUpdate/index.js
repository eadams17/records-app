import React, { PureComponent } from "react";
import RecordInformation from "../RecordInformation";
import styles from "./style.module.css";
import { Modal, Button, ModalFooter } from "reactstrap";

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
    const recordIndex = allRecords.findIndex(
      recordItem => recordItem.album_title === record.album_title
    );
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
    const { artist } = this.state;
    const indices = allRecords.reduce((arr, recordItem, index) => {
      recordItem.artist.id === record.artist.id && arr.push(index);
      return arr;
    }, []);
    let updatedRecords = allRecords;
    for (let i = 0; i < indices.length; i++) {
      const index = indices[i];
      const album = allRecords[index].album_title;
      const condition = allRecords[index].condition;
      const year = allRecords[index].year;
      updatedRecords[index] = {
        album_title: album,
        artist: {
          name: artist,
          id: record.artist.id
        },
        condition: condition,
        year: year
      };
    }
    updatedRecords.sort((recordA, recordB) => {
      return recordA.artist.name.localeCompare(recordB.artist.name);
    });
    updateRecords(updatedRecords);
    toggle();
  }

  checkForMultipleArtistEntries() {
    const { allRecords, record } = this.props;
    return (
      allRecords.filter(
        recordEntry => recordEntry.artist.id === record.artist.id
      ).length > 1
    );
  }

  handleSubmit = () => {
    const multipleEntriesExist = this.checkForMultipleArtistEntries();
    const artistUpdated = this.state.artist === this.props.record.artist.name;
    if (!multipleEntriesExist && artistUpdated) {
      this.updateSingleRecord();
    } else {
      this.updateMultipleRecords();
    }
  };
  render() {
    const { record, visible, toggle } = this.props;

    return (
      <Modal isOpen={visible} toggle={toggle} className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.iconContainer}>
            <i
              id={styles.closeIcon}
              className="fa fa-times-circle fa-lg"
              onClick={toggle}
            />
          </div>
          <i className="fas fa-compact-disc fa-6x fa-spin" />
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
