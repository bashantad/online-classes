class Stock < ApplicationRecord
	has_many :earning_histories
	has_many :sites
end
