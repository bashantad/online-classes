class ConversationSerializer < ActiveModel::Serializer
  	attributes :id, :title, :course_id
  	has_many :messages
  	has_many :users
end
