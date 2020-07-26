class Api::AssignmentSubmissionsController < Api::BaseController
  before_action :set_enrolled_course
  before_action :set_assignment

  def find_or_create
    @submission = @assignment.assignment_submissions.first_or_create(user_id: current_user.id)
    render json: @submission
  end

  def update
    @submission = @assignment.assignment_submissions.find_by(user_id: current_user.id, id: params[:id])
    if @submission.submitted?
      render_error_message("Assignment was already submitted.")
    else
      @submission.description = submission_params[:description]
      if submission_params[:submit].present?
        @submission.submission_date = Time.now
        @submission.save
        render_success_message("Assignment was successfully submitted.")
      else
        @submission.save
        render_success_message("Assignment was successfully saved.")
      end
    end
  end

  private

  def set_assignment
    chapter = @course.chapters.find(params[:chapter_id])
    @assignment = chapter.assignments.find(params[:assignment_id])
  end

  def submission_params
    params.require(:assignment_submission).permit(:description, :assignment_id, :chapter_id, :submit, :id)
  end
end
