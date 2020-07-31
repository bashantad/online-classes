class Teaching::EnrollmentsController < Teaching::BaseController
  before_action :set_owned_course
  before_action :set_enroll_request, only: [:accept, :decline]

  def accept
    @enroll_request.approve
    @enroll_request.course.enroll_in_general_conversation(@enroll_request.user)
    flash[:notice] = "The enrollment request is approved."
    redirect_to requests_teaching_course_enrollments_path(@course)
  end

  def decline
    @enroll_request.destroy
    flash[:notice] = "The enrollment request is declined."
    redirect_to requests_teaching_course_enrollments_path(@course)
  end

  def bulk_enrollment

  end

  def enroll_users
    records_created = []
    records_failed = []
    params[:enroll_request].each do |key, enroll_request_params|
      enroll_request = @course.enroll_requests.create(allowed_enroll_request_params(enroll_request_params))
      if enroll_request.persisted?
        records_created << enroll_request.email
      else
        records_failed << enroll_request.email
      end
    end
    created_count = records_created.count
    flash[:notice] = "#{created_count} #{'request'.pluralize(created_count)} #{created_count == 1 ? 'is' : 'are'} sent(#{records_created.join(", ")}). #{records_failed.count} didn't succeed."
    redirect_to requests_teaching_course_enrollments_path(@course)
  end

  def requests
    @enroll_user_requests = @course.enroll_requests
  end

  private

  def set_enroll_request
    @enroll_request = @course.enroll_requests.find(params[:enrollment_id])
  end

  def allowed_enroll_request_params(enroll_request_params)
    enroll_request_params.permit(:full_name, :email, :phone)
  end
end
