class Api::ConversationsController < Api::BaseController
	before_action :set_course
	before_action :set_course_service, only: [:create, :add_members]

	def create
		other_user = @course.enrolled_users.find(message_params[:other_user_id])
		@conversation = @course_service.find_or_create_one_on_one_conversation(current_user, other_user)
		render_conversation
	end

	def create_group
		@conversation = @course.conversations.new(title: params[:title], is_group: true)
		if @conversation.save
			@conversation.conversation_users.create(user_id: current_user.id)
			render_conversation
		else
			render json: {errors: @conversation.errors}
		end
	end

	def update_members
		@conversation = @course.conversations.groups.find(params[:conversation_id])
		@conversation.update_members(params[:user_ids])
		render_conversation
	end

	private

	def render_conversation
		if @conversation
			render json: @conversation, include: ['conversation_users', 'messages', 'messages.sender']
		end
	end

	def set_course_service
		@course_service = CourseService.new(@course)
	end

	def message_params
		params.permit(:other_user_id)
	end
end
