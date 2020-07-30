class Api::MessagesController < Api::BaseController
	def create
		conversation = current_user.conversations.find(params[:conversation_id])
		message = current_user.messages.new(message_params.merge(conversation_id: params[:conversation_id]))
		if message.save
			message.add_notification_to_its_readers
			serialized_data = ActiveModelSerializers::Adapter::Json.new(
				MessageSerializer.new(message)
			).serializable_hash
			MessagesChannel.broadcast_to conversation, serialized_data
			head :ok
		else
			render json: message.errors
		end
	end

	private

	def message_params
		params.require(:message).permit(:content)
	end
end
