import React from "react";

export const getConditionLevel = condition => {
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

export const COLOR_CODES = [
  "#FF0000",
  "#FF7F00",
  "#DDDD13",
  "#7FFF00",
  "#00FF00"
];

export const getButtonStyle = condition => {
  const level = getConditionLevel(condition);
  const color = COLOR_CODES[level - 1];
  return { backgroundColor: color, borderColor: color };
};

export const renderIcons = condition => {
  const level = getConditionLevel(condition);
  let icons = [];

  if (level > 0) {
    for (let i = 0; i < level; i++) {
      icons.push(
        <i
          key={i}
          style={{ color: COLOR_CODES[level - 1] }}
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
