class MessageSerializer < ActiveModel::Serializer
    attributes :id, :conversation_id, :sender_id, :content, :created_at, :updated_at, :created_time
    belongs_to :sender

end
