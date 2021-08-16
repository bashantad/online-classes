class Stock < ApplicationRecord
	has_many :earning_histories
	has_many :stock_prices
	has_many :sites
end
