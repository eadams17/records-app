import React, { PureComponent } from "react";
import styles from "./style.module.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input
} from "reactstrap";

class EditModal extends PureComponent {
  render() {
    const { record, visible, toggle } = this.props;

    return (
      <div>
        <Modal isOpen={visible} toggle={toggle} className={styles.modal}>
          <ModalHeader toggle={toggle} charCode="🎵">
            Edit Album Information
          </ModalHeader>
          <ModalBody>
            <InputGroup className={styles.detailsContainer}>
              <div className={styles.row}>
                <li className={styles.label}>Album</li>
                <Input
                  defaultValue={record.album_title}
                  className={styles.info}
                />
              </div>
              <div className={styles.row}>
                <li className={styles.label}>Artist</li>
                <Input
                  defaultValue={record.artist.name}
                  className={styles.info}
                />
              </div>
              <div className={styles.row}>
                <li className={styles.label}>Condition</li>
                <Input
                  defaultValue={record.condition}
                  className={styles.info}
                />
              </div>
              <div className={styles.row}>
                <li className={styles.label}>Year</li>
                <Input defaultValue={record.year} className={styles.info} />
              </div>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button className={styles.button} onClick={toggle}>
              Save
            </Button>{" "}
            <Button className={styles.button} onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

// <div className={styles.detailsContainer}>
//   <div className={styles.row}>
//     <li className={styles.label}>Album</li>
//     <li className={styles.info}>
//       {record.album_title}
//     </li>
//   </div>
//   <div className={styles.row}>
//     <li className={styles.label}>Artist</li>
//     <li className={styles.info}>
//       {record.artist.name}
//     </li>
//   </div>
//   <div className={styles.row}>
//     <li className={styles.label}>Condition</li>
//     <li className={styles.info}>{record.condition}</li>
//   </div>
//   <div className={styles.row}>
//     <li className={styles.label}>Year</li>
//     <li className={styles.info}>{record.year}</li>
//   </div>
// </div>;

export default EditModal;
