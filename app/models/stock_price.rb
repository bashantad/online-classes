class StockPrice < ApplicationRecord
	belongs_to :stock
	before_create :set_details

	def set_details
		stock_date = self.date
		self.day_of_the_week = stock_date.strftime("%A")
		self.week_number = compute_week_number(stock_date)
	end

	def self.update_percentage_change
		Stock.all.each do |stock|
			update_price_change_percentage(stock)
		end
	end

	def self.update_price_change_percentage(stock)
		stock_prices = stock.stock_prices.order("date ASC")
		return if stock_prices.empty?
		prev = 0
		change_mapping = stock_prices.inject({}) do |acc, 
			stock_price|
			if prev == 0
				change = 0
			else
				change = (stock_price.close_price - prev)/prev*100.0
			end
			acc[stock_price.id] = change
			prev = stock_price.close_price
			acc
		end
		
		stock_prices.each do |stock_price|
			stock_price.set_details
			stock_price.price_change_percentage = change_mapping[stock_price.id]
			stock_price.save
		end
	end

	def compute_week_number(date)
		diff = date.to_date - Date.parse("1960-01-03")
		diff.to_i/7
	end
end
