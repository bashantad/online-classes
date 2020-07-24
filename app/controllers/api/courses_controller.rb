class Api::CoursesController < Api::BaseController
	before_action :set_approved_course, only: [:show]
	before_action :set_enrolled_course, only: [:conversation_details]
	skip_before_action :authenticate_user!, only: [:index, :show]

	def index
		@courses = Course.approved
		render json: @courses, include: ['teacher']
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
		render json: @course, include: [
				'reviews',
				'reviews.user',
				'chapters',
				'chapters.course_contents',
				'chapters.assignments',
				'teacher',
				'teacher.experiences',
				'teacher.educations',
		]
	end

	def enrolled
		@courses = current_user.enrolled_courses.approved
		render json: @courses, include: ['reviews', 'reviews.user', 'chapters', 'teacher']
	end
end
