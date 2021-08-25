class Site < ApplicationRecord
	belongs_to :stock
	has_many :site_histories
end
