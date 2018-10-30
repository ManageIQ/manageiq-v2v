/**
 * Client Side Pagination helper which returns amountOfPages, itemCount,
 * itemsStart, itemsEnd, and paginated tasks
 */
export default function paginate(items, page, perPage) {
  // adapt to zero indexed logic
  const p = page - 1 || 0;
  const amountOfPages = Math.ceil(items.length / perPage);
  const startPage = p < amountOfPages ? p : 0;
  const endOfPage = startPage * perPage + perPage;
  return {
    amountOfPages,
    itemCount: items.length,
    itemsStart: startPage * perPage + 1,
    itemsEnd: endOfPage > items.length ? items.length : endOfPage,
    items: items.slice(startPage * perPage, endOfPage)
  };
}
