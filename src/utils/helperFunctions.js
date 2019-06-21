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

export const renderIcons = condition => {
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
