class MigrationLogController < ApplicationController
  before_action :check_privileges
  after_action :cleanup_action

  # Download the V2V migration log as a background task. There are
  # multiple log types possible, with the default set to 'v2v' if no
  # :log_type parameter is found.
  #
  # Upon task completion the log contents, status and status message
  # are rendered.
  #
  def download_migration_log
    plan_task = ServiceTemplateTransformationPlanTask.find(params[:id])
    log_type = params[:log_type] || 'v2v'
    miq_tasks_id = plan_task.transformation_log_queue(nil, log_type)
    task = MiqTask.wait_for_taskid(miq_tasks_id)
    task_results = task.task_results
    task_status = task.status
    task_message = task.message
    MiqTask.destroy(task)

    render :json => {
      :log_contents   => task_results,
      :status         => task_status,
      :status_message => task_message
    }
  end
end
