import React from "react";
import styles from "./style.module.css";
import RecordInformation from "../RecordInformation";
import { useSpring, animated } from "react-spring";

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

  return (
    <animated.div
      tabIndex="0"
      className={styles.panel}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => {
        set({ xys: [0, 0, 1] });
      }}
      style={{ transform: props.xys.interpolate(trans) }}
      onClick={() => toggleModal()}
      onKeyPress={e => handleKeyPress(e)}
    >
      <i className="fas fa-compact-disc fa-6x" />
      <RecordInformation record={record} insideModal={false} />
    </animated.div>
  );
}

export default Panel;
