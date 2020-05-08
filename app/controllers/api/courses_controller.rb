class Api::CoursesController < Api::BaseController
	before_action :set_course, only: [:show]

	def show
		render json: @course, include: ['enrolled_users', 'conversations.conversation_users', 'conversations', 'conversations.messages', 'conversations.messages.sender']
	end
end
