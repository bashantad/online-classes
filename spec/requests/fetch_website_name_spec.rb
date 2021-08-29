require "rails_helper"

RSpec.describe "Fetch website name", type: :request do
	def fetch_website_name(ticker, name)			
		name = name.gsub("Common Stock", "")
		visit "https://www.bing.com/search?q=#{name} Website"
		website = all("#b_results .b_algo").first.find(".b_attribution").text
		{
			ticker: ticker,
			name: name,
			website: website
		}		
	end

	def company_names
		file_path = Rails.root.join("spec/files/software-companies.csv")
		companies = []
		CSV.foreach(file_path, headers: true) do |row|
			companies << {
  				ticker: row["Symbol"],
  				company_name: row["Name"],
			}
		end

		#companies[1..-1]
		companies[0..2]
	end

	def append_data_to_file(data)
		file = Rails.root.join("app/models/update_website_mapping.rb")
		open(file, 'w') do |f| 
			f.puts "class UpdateWebsiteMapping"
			f.puts "  def self.update_websites"
		end

		data.each do |row|
			open(file, 'a') do |f|
				f.puts "    Stock.find_by(:ticker => '#{row[:ticker]}').update(:website => '#{row[:website]}')"
			end
		end
		open(file, 'a') { |f| f.puts "  end"; f.puts "end" }		
	end

	it "records stocks with it's website" do
		arr = (2..5).to_a
		data = []
		(company_names.uniq).each do |row|
			begin
				data << fetch_website_name(row[:ticker], row[:company_name])
			rescue => e
				puts "===== had an issue with #{row[:company_name]}"
			end
			interval = arr.sample
			sleep interval
		end
		append_data_to_file(data)
	end
end
