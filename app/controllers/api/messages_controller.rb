class Api::MessagesController < ApplicationController
	def create
		message = Message.new(message_params)
		conversation = Conversation.find(message_params[:conversation_id])
		if message.save
			MessageChannel.broadcast_to conversation, message.to_json
		end
	end

	private
	def message_params
		params.require(:message).permit(:text, :conversation_id)
	end
end
