import React, { PureComponent } from "react";
import RecordInformation from "../RecordInformation";
import styles from "./style.module.css";
import { Modal, Button, ModalFooter } from "reactstrap";
import {
  updateArtistName,
  checkForMultipleArtistEntries,
  getRecordIndex,
  checkInputsForContent,
  titleString
} from "./helperFunctions";
import { getFullCollection } from "../utils/sharedHelperFunctions";
import PropTypes from "prop-types";

class RecordUpdate extends PureComponent {
  state = {
    album: this.props.record.album_title,
    artist: this.props.record.artist.name,
    year: this.props.record.year,
    condition: this.props.record.condition,
    errors: []
  };

  updateField = (value, field) => {
    this.setState({ [field]: value });
  };

  updateSingleRecord() {
    const { allRecords, record, updateRecords, toggle, pageCount } = this.props;
    const fullCollection = getFullCollection(allRecords, pageCount);
    const { album, artist, year, condition } = this.state;
    const recordIndex = getRecordIndex(fullCollection, record);

    let updatedRecords = fullCollection;
    updatedRecords[recordIndex] = {
      album_title: titleString(album),
      artist: {
        name: titleString(artist),
        id: fullCollection[recordIndex].artist.id
      },
      condition: titleString(condition),
      year: year,
      id: record.id
    };
    updateRecords(updatedRecords);
    toggle();
  }
  updateMultipleRecords() {
    const { allRecords, record, updateRecords, toggle, pageCount } = this.props;
    const { album, artist, year, condition } = this.state;
    const fullCollection = getFullCollection(allRecords, pageCount);
    // update all records with new artist name-- performance heavy,
    // but would have been handled by a more efficient API call
    const alteredRecords = updateArtistName(
      fullCollection,
      record,
      titleString(artist)
    );
    const recordIndex = getRecordIndex(alteredRecords, record);

    let updatedRecords = alteredRecords;
    updatedRecords[recordIndex] = {
      album_title: titleString(album),
      artist: {
        name: titleString(artist),
        id: alteredRecords[recordIndex].artist.id
      },
      condition: titleString(condition),
      year: year,
      id: record.id
    };
    updateRecords(updatedRecords);
    toggle();
  }

  handleKeyPress(e) {
    e.key === "Enter" && this.handleSubmit();
  }

  handleSubmit = () => {
    const errors = checkInputsForContent(this.state);

    if (Object.keys(errors).length > 0) {
      this.setState({ errors: errors });
      return;
    }

    const { allRecords, record, pageCount } = this.props;
    const fullCollection = getFullCollection(allRecords, pageCount);
    const multipleEntriesExist = checkForMultipleArtistEntries(
      fullCollection,
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
          <i
            id={styles.recordIcon}
            className="fas fa-compact-disc fa-9x fa-spin"
          />
          <RecordInformation
            record={record}
            updateField={this.updateField}
            insideModal={true}
            errors={this.state.errors}
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

RecordUpdate.propTypes = {
  record: PropTypes.object.isRequired,
  allRecords: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  updateRecords: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired
};

export default RecordUpdate;
