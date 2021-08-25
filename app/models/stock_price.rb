class StockPrice < ApplicationRecord
	belongs_to :stock
	before_create :set_details

	def set_details
		stock_date = self.date
		self.day_of_the_week = stock_date.strftime("%A")
		self.week_number = stock_date.strftime("%Y%m%d").to_i/7
	end

	def self.update_percentage_change
		Stock.all.each do |stock|
			stock_prices = stock.stock_prices.order("date")
			prev = 0
			change_mapping = stock_prices.inject({}) do |acc, stock|
				if prev == 0
					change = 0
				else
					change = (stock.close_price - prev)/prev*100.0
				end
				acc[stock.date] = change
				prev = stock.close_price
				acc
			end

			stock_prices.each do |stock_price|
				stock_price.price_change_percentage = change_mapping[stock_price.date]
				stock_price.save
			end
		end
	end
end
