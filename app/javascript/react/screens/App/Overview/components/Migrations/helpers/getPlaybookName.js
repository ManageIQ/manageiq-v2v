const getPlaybookName = (serviceTemplatePlaybooks, job_id) => {
  const defaultPlaybookName = __('Unknown');
  if (job_id) {
    const playbookTemplate = serviceTemplatePlaybooks.find(p => p.id === job_id);
    if (playbookTemplate) {
      return playbookTemplate.name;
    }
  }
  return defaultPlaybookName;
};
export default getPlaybookName;
