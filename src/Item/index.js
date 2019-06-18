import React, { PureComponent } from "react";
import styles from "./style.module.css";
import RecordImage from "../record.svg";
import EditModal from "../EditModal";

class Item extends PureComponent {
  state = { visible: false };

  toggleModal = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  render() {
    const { record } = this.props;
    return (
      <div className={styles.container} onClick={() => this.toggleModal()}>
        {this.state.visible && (
          <EditModal
            record={record}
            visible={this.state.visible}
            toggle={this.toggleModal}
          />
        )}
        <img
          src={RecordImage}
          className={styles.image}
          alt="record-thumbnail"
        />
        <div className={styles.detailsContainer}>
          <div className={styles.row}>
            <li className={styles.label}>Album</li>
            <li className={styles.info}>{record.album_title}</li>
          </div>
          <div className={styles.row}>
            <li className={styles.label}>Artist</li>
            <li className={styles.info}>{record.artist.name}</li>
          </div>
          <div className={styles.row}>
            <li className={styles.label}>Condition</li>
            <li className={styles.info}>
              {record.condition === "very_good"
                ? "very good"
                : record.condition}
            </li>
          </div>
          <div className={styles.row}>
            <li className={styles.label}>Year</li>
            <li className={styles.info}>{record.year}</li>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
