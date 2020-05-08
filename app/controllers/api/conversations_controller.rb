class Api::ConversationsController < Api::BaseController
	before_action :set_course

	def create
		conversation = _find_or_create_one_on_one_conversation
		if conversation
			serialized_data = ActiveModelSerializers::Adapter::Json.new(
		    	ConversationSerializer.new(conversation)
		    ).serializable_hash

		    render json: serialized_data
		end
	end

	#TODO when a request comes in with more than one person(group)
	def create_group

	end

	private

	def _find_or_create_one_on_one_conversation
		other_user = @course.enrolled_users.find(message_params[:other_user_id])
		if other_user == current_user
			conversation = current_user.conversations.detect do |user_conversation|
				user_conversation.conversation_users.count == 1
			end
		else
			conversation = current_user.conversations.detect do |user_conversation|
				conversation_users = user_conversation.conversation_users
				conversation_users.count == 2 && conversation_users.find_by(user_id: other_user.id)
			end
		end

		unless conversation.present?
			conversation = @course.conversations.create
			conversation.conversation_users.create(:user_id => current_user.id)
			conversation.conversation_users.create(:user_id => other_user.id) unless current_user == other_user
		end
		conversation
	end

	def message_params
		params.permit(:other_user_id)
	end
end
