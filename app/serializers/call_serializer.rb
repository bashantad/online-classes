class CallSerializer < ApplicationSerializer
  attributes :id, :calling_code, :user_id
  belongs_to :user
end
