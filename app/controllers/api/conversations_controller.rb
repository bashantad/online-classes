class Api::ConversationsController < ApplicationController
	def create
		conversation = _find_or_create_conversation
		if conversation
			serialized_data = ActiveModelSerializers::Adapter::Json.new(
		    	ConversationSerializer.new(conversation)
		    ).serializable_hash

		    ActionCable.server.broadcast 'conversations_channel', serialized_data
			head :ok
		end
	end

	private

	def _find_or_create_conversation
		# TODO make sure these users can communicate with one another
		# The way, we can do this is by checking every class they are in
		# and see if they are studying in the same class as other peers
		# The second option is see if they are friends
		participant_ids = message_params[:participant_ids]
		conversation = current_user.conversation_users.detect do |current_user_conversation|
			conversation.conversation_users.collect.all? do |conversation_user|
				participant_ids.include?(conversation_user.id)
			end
		end

		unless conversation.present?
			conversation = Conversation.save
			participant_ids.each do |participant_id|
				conversation.conversation_users.create(:user_id => user_id)
			end
		end
	end

	def message_params
		params.require(:conversation).permit(:participant_ids)
	end
end
