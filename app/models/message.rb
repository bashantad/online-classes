class Message < ApplicationRecord
	belongs_to :conversation
	belongs_to :sender, foreign_key: :sender_id, class_name: 'User'

	def created_time
		created_at.strftime("%I:%M %p")
	end
end
