import React, { Component } from "react";
import styles from "./style.module.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input
} from "reactstrap";
import humanizeString from "humanize-string";

class EditModal extends Component {
  // state could just hold record
  state = {
    album: this.props.record.album_title,
    year: this.props.record.year,
    condition: humanizeString(this.props.record.condition)
  };

  updateField = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  handleKeyPress = e => {
    e.key === "Enter" && this.props.toggle();
  };

  handleSubmit = () => {
    console.log("hit");
    const { record, updateRecords, toggle } = this.props;
    const { album, year, condition } = this.state;
    const recordData = {
      id: record.id,
      album_title: album,
      artist: {
        name: record.artist.name,
        id: record.artist.id
      },
      year: year,
      condition: condition
    };
    updateRecords(recordData);
    toggle();
  };

  render() {
    const { record, visible, toggle } = this.props;

    return (
      <div>
        <Modal isOpen={visible} toggle={toggle} className={styles.modal}>
          <div className={styles.modalHeaderContainer}>
            <p className={styles.modalHeader}>Edit Album Information</p>
            <i
              tabIndex="0"
              id={styles.closeIcon}
              className="fas fa-compact-disc"
              onClick={toggle}
              onKeyPress={this.handleKeyPress}
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
                <li className={styles.label}>Year</li>
                <Input
                  defaultValue={record.year}
                  className={styles.info}
                  onChange={value => this.updateField(value, "year")}
                />
              </div>
              <div className={styles.row}>
                <li className={styles.label}>Condition</li>
                <Input
                  defaultValue={humanizeString(record.condition)}
                  className={styles.info}
                  onChange={value => this.updateField(value, "condition")}
                />
              </div>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              className={styles.button}
              onClick={() => this.handleSubmit()}
              onKeyPress={this.handleKeyPress}
            >
              Save
            </Button>
            <Button
              className={styles.button}
              onClick={toggle}
              onKeyPress={this.handleKeyPress}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
