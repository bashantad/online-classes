class Api::ConversationsController < ApplicationController
	def index
		conversations = Conversation.all
		render json: conversations
	end

	def create
		conversation = Conversation.new
		if conversation.save
			ActionCable.server.broadcast 'conversations_channel', conversation.to_json
			head :ok
		end
	end
end
