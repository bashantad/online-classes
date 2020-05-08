class Course < ApplicationRecord
	belongs_to :owner, foreign_key: :user_id, class_name: 'User'
	belongs_to :category
	has_many :conversations
	has_many :enrolled_course_users
	has_many :enrolled_users, through: :enrolled_course_users, source: :user
	scope :approved, -> { where(approved: true) }

	def approve
		unless self.conversations.exists?
			_enroll_in_general_conversation
		end
		update(:approved => true)
	end

	def disapprove
		update(:approved => false)
	end

	def approved_text
		approved ? 'Yes' : 'No'
	end

	private

	def _enroll_in_general_conversation
		self.enrolled_course_users.create(user_id: self.owner.id)
		conversation = self.conversations.create(title: 'General', is_group: true)
		conversation.conversation_users.create(user_id: self.owner.id)
	end
end
