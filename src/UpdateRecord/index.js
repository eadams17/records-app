import React, { PureComponent } from "react";
import styles from "./style.module.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input
} from "reactstrap";

class EditModal extends PureComponent {
  // state could just hold record
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
    console.log("record", updatedRecords[recordIndex]);
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
    console.log("1", multipleEntriesExist);
    console.log("2", artistUpdated);
    if (!multipleEntriesExist && artistUpdated) {
      this.updateSingleRecord();
    } else {
      this.updateMultipleRecords();
    }
  };
  render() {
    console.log("state", this.state);
    const { record, visible, toggle } = this.props;

    return (
      <div>
        <Modal isOpen={visible} toggle={toggle} className={styles.modal}>
          <div className={styles.modalHeaderContainer}>
            <p className={styles.modalHeader}>Edit Album Information</p>
            <i
              id={styles.closeIcon}
              className="fas fa-compact-disc"
              onClick={toggle}
            />
          </div>
          <ModalBody>
            <FormGroup className={styles.detailsContainer}>
              <div className={styles.row}>
                <li className={styles.label}>Album</li>
                <Input
                  defaultValue={record.album_title}
                  className={styles.info}
                  onChange={value => this.updateField(value, "album")}
                />
              </div>
              <div className={styles.row}>
                <li className={styles.label}>Artist</li>
                <Input
                  defaultValue={record.artist.name}
                  className={styles.info}
                  onChange={value => this.updateField(value, "artist")}
                />
              </div>
              <div className={styles.row}>
                <li className={styles.label}>Condition</li>
                <Input
                  defaultValue={record.condition}
                  className={styles.info}
                  onChange={value => this.updateField(value, "condition")}
                />
              </div>
              <div className={styles.row}>
                <li className={styles.label}>Year</li>
                <Input
                  defaultValue={record.year}
                  className={styles.info}
                  onChange={value => this.updateField(value, "year")}
                />
              </div>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className={styles.button} onClick={this.handleSubmit}>
              Save
            </Button>
            <Button className={styles.button} onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
