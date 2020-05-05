class Api::MessagesController < ApplicationController
	def create
		message = current_user.messages.new(message_params)
		# TODO find a way to authorize conversation
		# An example of this could be as follows
		# current_user.conversations.where(conversation_id: message_params[:conversation_id])
		conversation = Conversation.find(message_params[:conversation_id])
		if message.save
			serialized_data = ActiveModelSerializers::Adapter::Json.new(
        		MessageSerializer.new(message)
      		).serializable_hash

      		MessagesChannel.broadcast_to conversation, serialized_data
      		head :ok
		end
	end

	private

	def message_params
		params.require(:message).permit(:content, :conversation_id)
	end
end
