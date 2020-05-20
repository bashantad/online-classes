class Api::UsersController < Api::BaseController
	def current_user_info
		render json: current_user, include: [
			'conversations',
			'conversations.conversation_enrolled_users',
			'conversations.messages',
			'conversations.messages.sender',
			'user_message_notifications',
			'enrolled_courses'
		]
	end

	def mark_messages_read
		conversation = current_user.conversations.find(params[:conversation_id])
		conversation.mark_messages_read(current_user)
		head :ok
	end
end
