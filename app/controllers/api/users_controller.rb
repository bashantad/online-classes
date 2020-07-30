class Api::UsersController < Api::BaseController
	def current_user_info
		render json:  current_user, include: %w[educations experiences]
	end

	def mark_messages_read
		conversation = current_user.conversations.find(params[:conversation_id])
		conversation.mark_messages_read(current_user)
		head :ok
	end
end
