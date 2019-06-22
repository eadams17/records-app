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

export const matchRecordEntry = (record, searchString, searchType) => {
  const query = searchString.toLowerCase();
  switch (searchType) {
    case "album":
      return record.album_title.toLowerCase().includes(query);
    case "artist":
      return record.artist.name.toLowerCase().includes(query);
    case "year":
      return record.year.toString().includes(query);
    default:
      break;
  }
};

export const checkForMultipleArtistEntries = (allRecords, record) => {
  return (
    allRecords.filter(recordEntry => recordEntry.artist.id === record.artist.id)
      .length > 1
  );
};

export const updateArtistName = (allRecords, record, artist) => {
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
  updatedRecords.sort((recordA, recordB) => {
    return recordA.artist.name.localeCompare(recordB.artist.name);
  });
  return updatedRecords;
};

export const getRecordIndex = (allRecords, record) =>
  allRecords.findIndex(
    recordItem => recordItem.album_title === record.album_title
  );
