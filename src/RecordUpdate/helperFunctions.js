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
