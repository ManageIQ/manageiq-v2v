/**
 * Simple client side list filter for Plan Request Detail List
 *
 * activeFilters: {
 *  label: 'Host Name: {value}',
 *  field: {id: "transformation_host_name", title: "Host Name", placeholder: "Filter by Host Name", filterType: "text"},
 *  value: '{value}'
 * }
 *
 * tasks: [{
 *  transformation_host_name: 'rhvh01.example.com',
 *  message: 'Migrating',
 *  ...
 * }]
 */
export default function listFilter(activeFilters, tasks) {
  if (activeFilters && activeFilters.length && tasks && tasks.length) {
    const filteredTasks = [];
    tasks.forEach(task => {
      const match = activeFilters.every(filter => `${task[filter.field.id] || ''}`.indexOf(filter.value) > -1);
      if (match) {
        filteredTasks.push(task);
      }
    });
    return filteredTasks;
  }
  return tasks;
}
