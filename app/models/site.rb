class Site < ApplicationRecord
	belongs_to :stock
	has_Many :site_histories
end
