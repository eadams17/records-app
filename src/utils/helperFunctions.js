import React from "react";
import humanizeString from "humanize-string";

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
  const albumMatch = record.album_title.toLowerCase().includes(query);
  const artistMatch = record.artist.name.toLowerCase().includes(query);
  const yearMatch = record.year.toString().includes(query);
  const conditionMatch = humanizeString(record.condition)
    .toLowerCase()
    .includes(query);
  switch (searchType) {
    case "all":
      return albumMatch || artistMatch || yearMatch || conditionMatch;
    case "album":
      return albumMatch;
    case "artist":
      return artistMatch;
    case "year":
      return yearMatch;
    case "condition":
      return conditionMatch;
    default:
      break;
  }
};

export const getFullCollection = records => {
  let fullCollection = [];
  const pageCount = Object.keys(records).length;
  let pageNumber = 1;
  while (pageNumber <= pageCount) {
    fullCollection = fullCollection.concat(records[pageNumber]);
    pageNumber += 1;
  }
  return fullCollection;
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
      year: year,
      id: allRecords[index].id
    };
  }
  updatedRecords.sort((recordA, recordB) => {
    return recordA.artist.name.localeCompare(recordB.artist.name);
  });
  return updatedRecords;
};

export const getRecordIndex = (allRecords, record) =>
  allRecords.findIndex(recordItem => recordItem.id === record.id);

export const checkInputsForContent = state => {
  const { album, artist, year, condition } = state;
  const stateArr = [
    [album, "album"],
    [artist, "artist"],
    [year, "year"],
    [condition, "condition"]
  ];
  const errors = {};

  stateArr.map((value, i) => {
    return !value[0]
      ? (errors[value[1]] = `${value[1]} field cannot be blank`)
      : null;
  });
  return errors;
};

export const titleString = str => str.replace(/\b(\w)/g, k => k.toUpperCase());
