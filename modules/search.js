export default function searchItems(data, query) {
  const searchResults = data.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.content.toLowerCase().includes(query.toLowerCase())
  );
  return searchResults;
}
