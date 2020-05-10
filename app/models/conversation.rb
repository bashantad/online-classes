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
		UserMessageNotification.delete_all
		Message.delete_all
		ConversationUser.delete_all
		Conversation.individuals.delete_all
	end

	def mark_messages_read(user)
		message_ids = self.messages.collect(&:id)
		unread_notifications = user.user_message_notifications.unread.where(message_id: message_ids)
		unread_notifications.each(&:mark_as_read)
	end
end
