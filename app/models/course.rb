class Course < ApplicationRecord
	belongs_to :user
	belongs_to :category
	has_many :conversations
end
