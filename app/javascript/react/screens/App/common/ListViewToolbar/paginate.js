/**
 * Client Side Pagination helper which returns amountOfPages, itemCount,
 * itemsStart, itemsEnd, and paginated tasks
 */
export default function paginate(tasks, page, perPage) {
  // adapt to zero indexed logic
  const p = page - 1 || 0;
  const amountOfPages = Math.ceil(tasks.length / perPage);
  const startPage = p < amountOfPages ? p : 0;
  const endOfPage = startPage * perPage + perPage;
  return {
    amountOfPages,
    itemCount: tasks.length,
    itemsStart: startPage * perPage + 1,
    itemsEnd: endOfPage > tasks.length ? tasks.length : endOfPage,
    tasks: tasks.slice(startPage * perPage, endOfPage)
  };
}
