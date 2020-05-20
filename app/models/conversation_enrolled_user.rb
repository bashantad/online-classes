class ConversationEnrolledUser < ApplicationRecord
  belongs_to :conversation
  belongs_to :user
end
