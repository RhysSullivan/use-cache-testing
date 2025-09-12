export async function getSearchData() {
  // wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    data: `search data ${Math.random()}`,
  };
}
