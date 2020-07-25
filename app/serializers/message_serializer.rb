class MessageSerializer < ApplicationSerializer
    attributes :id, :conversation_id, :sender_id, :content, :created_at, :updated_at, :created_time
    belongs_to :sender
    has_many :user_message_notifications do
  		UserMessageNotification.hashify_message_notification(object)
  	end
end
