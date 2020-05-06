class Category < ApplicationRecord
	has_many :courses
	scope :active, -> { where(active: true) }

end
