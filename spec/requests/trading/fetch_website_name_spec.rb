require "rails_helper"

RSpec.describe "Fetch website name",
type: :request do
	def fetch_website_name(ticker, name, file_handle)
		name = name.gsub("Common Stock", "")
		visit "https://www.bing.com/search?q=#{name} Website"
		website = all("#b_results .b_algo").first.find(".b_attribution").text
		data = {
			ticker: ticker,
			name: name,
			website: website
		}
		file_handle.puts data.to_json
	end	

	def company_names
		file_path = Rails.root.join("spec/files/software-companies.csv")
		companies = []
		existings = []
		CSV.foreach(file_path,
			headers: true) do |row|
			next if existings.include?(row["Symbol"])
			companies << {
  				ticker: row["Symbol"],
  				company_name: row["Name"],
			}
		end

		companies[1..-1]
	end

	it "records stocks with it's website" do
		arr = (2..5).to_a
		file = Rails.root.join("spec/files/website_mapping.txt")
		open(file,
			'w') do |file_handle|
			(company_names.uniq).each do |row|
				begin
					fetch_website_name(row[:ticker], row[:company_name], file_handle)
				rescue => e
					puts "===== had an issue with #{row[:company_name]}"
				end
				interval = arr.sample
				sleep interval
			end
		end
	end
end
