class RecordTrafficSiteService
	class << self
		def import_data
			file_name = "spec/files/traffic_site_history_alexa_data.txt"
			process_history(file_name)
		end

		def process_history(file_name)
			data = get_alexa_data(file_name)
			data.each do |parsed|
			  	site = Site.find_by(:company_url => parsed["company_url"])
			  	if site.blank?
			  		puts "site not imported #{parsed["company_url"]}"
			  	else
				  	parsed["site_id"] = site.id
				  	site_history = site.site_histories.new(parsed)
				  	site_history.save
				    puts "saved: #{site_history.id}: #{site.company_url}"
				end
			end			
		end

		def get_alexa_data(file_name)
			return @data if defined?@data
			file_path = Rails.root.join(file_name)
			data = []
			File.open(file_path, "r") do |f|
			  f.each_line do |line|
			  	begin
				  	parsed = JSON.parse(line)
				  	company_url = parsed.delete("sitename")
				  	next if company_url.include?(".gov") || company_url.include?(".edu")
				  	parsed["company_url"] = company_url		  	
				  	data << parsed
				rescue 
					puts "issue parsing #{line}"
				end
			  end
			end
			@data = data
		end
	end
end