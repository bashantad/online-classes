class Api::CoursesController < Api::BaseController
	before_action :set_course, only: [:show, :conversation_details]
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
		render json: @course, include: ['owner']
	end
end
