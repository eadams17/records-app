import React from "react";
import styles from "./style.module.css";
import { useSpring, animated } from "react-spring";
import humanizeString from "humanize-string";

const getConditionLevel = condition => {
  switch (condition) {
    case "Mint":
      return 5;
    case "Very good":
      return 4;
    case "Good":
      return 3;
    case "Fair":
      return 2;
    case "Poor":
      return 1;
    default:
      return 0;
  }
};

const renderIcons = condition => {
  const level = getConditionLevel(condition);
  const colorCodes = ["#FF0000", "#FF7F00", "#DDDD13", "#7FFF00", "#00FF00"];
  let icons = [];

  if (level > 0) {
    for (let i = 0; i < level; i++) {
      icons.push(
        <i
          key={i}
          style={{ color: colorCodes[level - 1] }}
          className="fas fa-star"
        />
      );
    }
    return icons;
  } else {
    icons = [<i className="fas fa-headphones-alt" />];
    return icons;
  }
};

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1
];

const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export function Panel({
  isLast,
  record,
  toggleModal,
  isActive,
  toggleActiveState,
  handleKeyPress
}) {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));

  const condition = humanizeString(record.condition);

  return (
    <animated.div
      tabIndex="0"
      className={styles.card}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => {
        set({ xys: [0, 0, 1] });
        toggleActiveState();
      }}
      onMouseEnter={() => toggleActiveState()}
      onFocus={() => toggleActiveState()}
      onBlur={() => toggleActiveState()}
      style={{ transform: props.xys.interpolate(trans) }}
      onClick={() => toggleModal()}
      onKeyPress={e => handleKeyPress(e)}
    >
      <i className={`fas fa-compact-disc fa-6x ${isActive ? "fa-spin" : ""}`} />
      <div className={styles.detailsContainer}>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-compact-disc" />
            <li className={styles.label}>Album</li>
          </div>
          <li id={styles.album} className={styles.info}>
            {record.album_title}
          </li>
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-user-circle" />
            <li className={styles.label}>Artist</li>
          </div>
          <li className={styles.info}>{record.artist.name}</li>
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="far fa-calendar-alt" />
            <li className={styles.label}> Year</li>
          </div>
          <li className={styles.info}>{record.year}</li>
        </div>
        <div className={styles.row}>
          <div className={styles.innerRow}>
            <i className="fas fa-heartbeat" />
            <li className={styles.label}>Condition</li>
          </div>
          <div className={styles.conditionContainer}>
            <li id={styles.condition} className={styles.info}>
              {condition}
            </li>
            <div>{renderIcons(condition)}</div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default Panel;
