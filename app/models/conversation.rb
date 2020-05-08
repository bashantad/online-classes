class Conversation < ApplicationRecord
	belongs_to :course
	has_many :messages
	has_many :conversation_users
	has_many :users, through: :conversation_users
end
