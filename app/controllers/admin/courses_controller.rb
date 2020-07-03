class Admin::CoursesController < Admin::BaseController
	before_action :set_course, except: [:index]

	def index
		@courses = Course.where(approved: params[:approved])
	end

	def approve
		@course.approve
		flash[:notice] = "#{@course.title} has been approved"
		redirect_to admin_courses_path
	end

	def disapprove
		@course.disapprove
		flash[:notice] = "#{@course.title} has been disapproved"
		redirect_to admin_courses_path
	end

	def enrollment

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
		flash[:notice] = "#{created_count} #{'request'.pluralize(created_count)} #{created_count == 1 ? 'is' : 'are'} created(#{records_created.join(", ")}). #{records_failed.count} didn't succeed."
		redirect_to admin_course_enrollment_requests_path(@course)
	end

	def enrollment_requests
		@enroll_user_requests = @course.enroll_requests
	end

	private

	def set_course
		@course = Course.find(params[:course_id])
	end

	def allowed_enroll_request_params(enroll_request_params)
		enroll_request_params.permit(:full_name, :email, :phone)
	end
end
