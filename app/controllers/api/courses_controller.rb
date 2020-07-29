class Api::CoursesController < Api::BaseController
	before_action :set_approved_course, only: [:show, :enrollment_request]
	before_action :set_enrolled_course, only: [:conversation_details]
	skip_before_action :authenticate_user!, only: [:index, :show]

	def index
		@courses = Course.approved
		render json: @courses, include: ['teacher']
	end

	def conversation_details
		render json: @course, include: %w[enrolled_users conversations.conversation_enrolled_users conversations conversations.messages conversations.messages.sender]
	end

	def enrollment_request
		@enrollment_request = @course.enroll_requests.new(user_id: current_user.id, email: current_user.email)
		if @enrollment_request.save
			render_success_message("Successfully sent the enrollment request. You will be notified once you are accepted to the course")
		else
			render_error_message("Error saving the enrollment request")
		end
	end

	def show
		render json: @course, include: %w[reviews reviews.user chapters chapters.course_contents chapters.assignments teacher teacher.experiences teacher.educations]
	end

	def enrolled
		@courses = current_user.enrolled_courses.approved
		render json: @courses, include: %w[reviews reviews.user chapters teacher]
	end
end
