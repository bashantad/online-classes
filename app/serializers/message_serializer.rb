class MessageSerializer < ActiveModel::Serializer
    attributes :id, :conversation_id, :content, :created_at, :updated_at
end
