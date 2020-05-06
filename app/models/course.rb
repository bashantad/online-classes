class Course < ApplicationRecord
	belongs_to :user
	belongs_to :category
	has_many :conversations
	scope :approved, -> { where(approved: true) }

	def approve
		unless self.conversations.exists?
			_create_general_conversation
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

	def _create_general_conversation
		self.conversations.create(title: 'General')
	end
end
