import React, { PureComponent, Fragment } from "react";
import styles from "./style.module.css";
import RecordImage from "../record.svg";
import UpdateRecord from "../UpdateRecord";
import { useSpring, animated } from "react-spring";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Card({ isLast, record, toggleModal }) {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));
  return (
    <animated.div
      className={styles.card}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
      onClick={() => toggleModal()}
    >
      <img src={RecordImage} className={styles.image} alt="record-thumbnail" />
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
            {record.condition === "very_good" ? "very good" : record.condition}
          </li>
        </div>
        <div className={styles.row}>
          <li className={styles.label}>Year</li>
          <li className={styles.info}>{record.year}</li>
        </div>
      </div>
    </animated.div>
  );
}

class Record extends PureComponent {
  state = { visible: false };

  toggleModal = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  render() {
    const { record, isLast, allRecords, updateRecords } = this.props;
    return (
      <Fragment>
        <Card isLast={isLast} record={record} toggleModal={this.toggleModal} />
        {this.state.visible && (
          <UpdateRecord
            allRecords={allRecords}
            record={record}
            updateRecords={updateRecords}
            visible={this.state.visible}
            toggle={this.toggleModal}
          />
        )}
      </Fragment>
    );
  }
}

export default Record;
