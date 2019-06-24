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
