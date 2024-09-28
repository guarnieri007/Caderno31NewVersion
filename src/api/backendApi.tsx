export const fetchBestOfMonth = async () => {
  const response = await fetch('/api/bestofmonth');
  const content = await response.json();
  return content;
};