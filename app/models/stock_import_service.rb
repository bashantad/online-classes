class StockImportService
	class << self
		def import_stocks
			output = []
			read_stock_csv.each do |row|
				begin
					stock = save_stock(row)
					output << stock.ticker + " saved"
				rescue => e
					output << e.message
				end
			end
			output
		end

		private

		def read_stock_csv
			return @stocks if defined?@data
			file_path = get_full_path("software-companies.csv")
			data = CSV.read(file_path)
			data.shift
			@stocks = data
		end

		def get_full_path(file_name)
			Rails.root.join("stocks/#{file_name}")
		end

		def get_stock_csv_data(name)
			stocks.detect { |stock| stock[1].include?(name) }
		end

		def save_stock(row)
			symbol, name, price, change, change_volume_percentage, volume, avg_volume, market_cap, pe_ratio, range = row
			return if Stock.exists?(name: name)
			if Stock.exists?(ticker: symbol)
				puts "Already in the system: #{symbol}"
				return
			end
			record = {
				:ticker => symbol,
				:name => name,
				:market_cap => market_cap,
				:volume => volume,
				:industry => "Software",
			}
			stock = Stock.new(record)
			stock.save
			stock	
		end
	end
end