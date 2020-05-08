class Conversation < ApplicationRecord
	belongs_to :course
	has_many :messages
	has_many :conversation_users
	has_many :users, through: :conversation_users

	scope :groups, -> { where(is_group: true) }
	scope :individuals, -> { where(is_group: false) }

	#TODO: remove For testing purpose only
	def self.wipe_out_the_data
		return unless Rails.env.development?
		Message.delete_all
		ConversationUser.delete_all
		Conversation.individuals.delete_all
	end
end
