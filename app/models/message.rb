class Message < ApplicationRecord
	belongs_to :conversation
	belongs_to :sender, foreign_key: :sender_id, class_name: 'User'
	has_many :user_message_notifications
    has_many :notification_users, through: :user_message_notifications, source: :user

	def created_time
		created_at.strftime("%I:%M %p")
	end

	def add_notification_to_its_readers
		self.conversation.users.each do |user|
			if user.id != self.sender_id
				self.user_message_notifications.create(:user_id => user.id, :sender_id => self.sender_id)
			end
		end
	end
end
