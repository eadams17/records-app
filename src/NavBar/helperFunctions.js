import humanizeString from "humanize-string";

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
