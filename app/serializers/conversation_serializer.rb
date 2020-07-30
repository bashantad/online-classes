class ConversationSerializer < ApplicationSerializer
  	attributes :id, :title, :course_id, :is_group, :message_url
  	has_many :messages
  	has_many :conversation_enrolled_users
end
