class Api::MessagesController < Api::BaseController
	def create
		message = current_user.messages.new(message_params)
		conversation = current_user.conversations.find(message_params[:conversation_id])
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
