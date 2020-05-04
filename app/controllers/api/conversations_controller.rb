class Api::ConversationsController < ApplicationController
	def index
		conversations = Conversation.all
		render json: conversations.to_json(include: :messages)
	end

	def create
		conversation = Conversation.new
		if conversation.save
			serialized_data = ActiveModelSerializers::Adapter::Json.new(
		    	ConversationSerializer.new(conversation)
		    ).serializable_hash

		    ActionCable.server.broadcast 'conversations_channel', serialized_data
			head :ok
		end
	end
end
