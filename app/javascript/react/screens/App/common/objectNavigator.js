export default (path, object) =>
  path.split('.').reduce((previous, current) => (previous ? previous[current] : null), object);
