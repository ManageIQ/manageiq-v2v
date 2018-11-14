/**
 * Simple client side list filter for Plan Request Detail List
 *
 * currentSortType: { id: 'delivered_on', title: 'Started', isNumeric: true }
 *
 * tasks: [{
 *  message: 'Migrating',
 *  delivered_on: '2018-01-30T21:12:34.808Z'
 *  ...
 * }]
 */
export default function sortFilter(currentSortType, isSortNumeric, isSortAscending, items = []) {
  const itemsCopy = [...items];
  if (currentSortType && itemsCopy && itemsCopy.length) {
    if (isSortNumeric) {
      // handle numbers and dates
      return itemsCopy.sort((a, b) => {
        const x = a[currentSortType.id];
        const y = b[currentSortType.id];
        return isSortAscending ? x - y : y - x;
      });
    }

    // for strings, use a simple natural sort algorithm
    // http://snipplr.com/view/36012/javascript-natural-sort/

    let a;
    let b;
    let a1;
    let b1;
    const rx = /(\d+)|(\D+)/g;
    const rd = /\d+/;

    return itemsCopy.sort((as, bs) => {
      a = String(as[currentSortType.id])
        .toLowerCase()
        .match(rx);
      b = String(bs[currentSortType.id])
        .toLowerCase()
        .match(rx);
      if (isSortAscending) {
        while (a.length && b.length) {
          a1 = a.shift();
          b1 = b.shift();
          if (rd.test(a1) || rd.test(b1)) {
            if (!rd.test(a1)) return 1;
            if (!rd.test(b1)) return -1;
            if (a1 !== b1) return a1 - b1;
          } else if (a1 !== b1) return a1 > b1 ? 1 : -1;
        }

        return a.length - b.length;
      }
      while (a.length && b.length) {
        a1 = a.shift();
        b1 = b.shift();
        if (rd.test(a1) || rd.test(b1)) {
          if (!rd.test(a1)) return -1;
          if (!rd.test(b1)) return 1;
          if (a1 !== b1) return b1 - a1;
        } else if (a1 !== b1) return a1 > b1 ? -1 : 1;
      }

      return b.length - a.length;
    });
  }
  return itemsCopy;
}
