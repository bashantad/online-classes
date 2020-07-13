class Api::CoursesController < Api::BaseController
	before_action :set_approved_course, only: [:show]
	before_action :set_enrolled_course, only: [:conversation_details]
	skip_before_action :authenticate_user!, only: [:index, :show]

	def index
		@courses = Course.approved
		render json: @courses, include: ['owner']
	end

	def conversation_details
		render json: @course, include: [
			'enrolled_users',
			'conversations.conversation_enrolled_users',
			'conversations',
			'conversations.messages',
			'conversations.messages.sender'
		]
	end

	def show
		render json: @course, include: ['owner', 'reviews', 'reviews.user', 'course_contents']
	end

	def enrolled
		@courses = current_user.enrolled_courses.approved
		render json: @courses, include: ['owner', 'reviews', 'reviews.user', 'course_contents']
	end
end
