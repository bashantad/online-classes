class Conversation < ApplicationRecord
	belongs_to :course
	has_many :messages
	has_many :conversation_users
	has_many :users, through: :conversation_users

	scope :individual, -> { where(course_id: nil) }
	scope :groups, -> { where.not(course_id: nil) }

	def is_group
		self.course_id.present?
	end
end
