class MigrationLogController < ApplicationController
  before_action :check_privileges
  after_action :cleanup_action

  def download_migration_log
    #render :json => migration_log_json(params[:id])
  end

  private

  def migration_log_json(transformation_plan_task_id)
    plan_task = ServiceTemplateTransformationPlanTask.find(transformation_plan_task_id)
    miq_tasks_id = plan_task.transformation_log_queue()
    task = MiqTask.wait_for_taskid(miq_tasks_id)
    task_results = task.task_results
    task_status = task.status
    task_message = task.message
    MiqTask.destroy(task)

    {
      :log_contents   => task_results,
      :status         => task_status,
      :status_message => task_message
    }
  end
end
