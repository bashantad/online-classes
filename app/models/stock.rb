class Stock < ApplicationRecord
	has_many :earning_histories
	has_many :stock_prices
	has_many :sites

	def ticker_with_name
		"#{ticker} (#{name})"
	end

	def display_website
		website.to_s.gsub("https://", "").gsub("www.", "").split("/").first
	end

	def create_stock_price(csv_row)
		parsed_data = _format_csv_to_db_row(csv_row)
		self.stock_prices.create(parsed_data)
	end	

	def _format_csv_to_db_row(csv_row)
        {
           :date => csv_row["Date"],
           :open_price => csv_row["Open"],
           :high_price => csv_row["High"],
           :close_price => csv_row["Close"],
           :low_price => csv_row["Low"],
           :adjusted_close_price => csv_row["Adj Close"],
           :volume => csv_row["Volume"],
        }
   end

   def near_by_earning_dates(range_in_days)
   	all_dates = get_available_dates
		self.formatted_earning_dates
		.collect do |date|
			index = all_dates.index(date)
			next if index.nil?
			from = index - range_in_days
			to = index + range_in_days
			all_dates[from..to]
		end.compact.flatten.uniq
   end

   def formatted_earning_dates
   	self.earning_histories
   		.select("earning_date")
   		.collect { |row| row.earning_date.strftime("%Y-%m-%d") }
   end

   def get_available_dates
   	@dates ||= self.stock_prices
   	.select("date")
   	.order("date")
   	.collect(&:date)
   	.collect { |date| date.strftime("%Y-%m-%d") }
   end
end
