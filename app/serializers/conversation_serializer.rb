class ConversationSerializer < ActiveModel::Serializer
  	attributes :id, :title, :course_id, :is_group
  	has_many :messages
  	has_many :users
end
