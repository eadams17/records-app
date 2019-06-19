import queryString from "query-string";

export const getRecords = params => {
  const query = queryString.stringify(params);
  return fetch(`http://localhost:9292/records?${query}`)
    .then(result => result.json())
    .then(response => {
      return response;
    });
};
