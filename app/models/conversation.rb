class Conversation < ApplicationRecord
	belongs_to :course
	has_many :messages
	has_many :conversation_users
	has_many :users, through: :conversation_users

	scope :groups, -> { where(is_group: true) }
	scope :individuals, -> { where(is_group: false) }

	validates_uniqueness_of :title, scope: %i[course_id]

	#TODO: remove For testing purpose only
	def self.wipe_out_the_data
		return unless Rails.env.development?
		UserMessageNotification.delete_all
		Message.delete_all
		ConversationUser.delete_all
		Conversation.individuals.delete_all
	end

	def mark_messages_read(user)
		message_ids = self.messages.where.not(sender_id: user.id).collect(&:id)
		unread_notifications = user.user_message_notifications.unread.where(message_id: message_ids)
		unread_notifications.each(&:mark_as_read)
	end

	#TODO move this to CourseService.
	def update_members(user_ids)
		course = self.course
		user_ids_to_be_enrolled = course.enrolled_users.where(id: user_ids).collect(&:id)
		existing_conversation_user_ids = self.conversation_users.collect(&:user_id)
		user_ids_to_be_removed = existing_conversation_user_ids - user_ids_to_be_enrolled
		user_ids_to_be_enrolled.each do |user_id_to_be_enrolled|
			self.conversation_users.create(user_id: user_id_to_be_enrolled)
		end
		self.conversation_users.where(user_id: user_ids_to_be_removed).destroy_all
	end
end
