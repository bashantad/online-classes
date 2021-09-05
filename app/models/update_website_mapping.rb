require 'csv'
class UpdateWebsiteMapping
	class << self
		def update_website_for_stocks
			file_path = "spec/files/website_mapping.txt"
			data = websites(file_path)
			data.each do |row|
				stock = Stock.find_by(ticker: row[:ticker])
				if stock.present? && row[:website].present?
					stock.update(:website => row[:website])
				end
			end
		end

		private

		def websites(file_path)
			return @websites if defined?@websites
			websites = []
			File.open(file_path, "r") do |f|
			  f.each_line do |line|
			  	websites << JSON.parse(line).with_indifferent_access
			  end
			end
			@websites = websites
		end
	end
end