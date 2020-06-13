class CallSerializer < ActiveModel::Serializer
  attributes :id, :call_code, :user_id
  belongs_to :user
end
