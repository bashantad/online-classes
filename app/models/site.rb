class Site < ApplicationRecord
	belongs_to :stock
	has_many :site_histories

	def self.create_default_sites
		Stock.all.each do |stock|
			website = stock.display_website
			next if website.blank?
			next if stock.sites.where(:company_url => website).present?
			stock.sites.create(:company_url => website, is_main: true)
		end
	end

	def self.create_subsidiaris_sites
		Stock.all.each do |stock|
			subsidiaries = stock.subsidiaries
			next if subsidiaries.blank?
			subsidiaries.split(",").each do |url|
				url = Site.extract_website(url)
				next if url.blank?
				url = url.strip
				next if url.include?("http:")
				next if stock.sites.where(:company_url => url).present?
				stock.sites.create(:company_url => url, is_main: false)
			end
		end
	end

	def self.extract_website(url)
		url.to_s.gsub("https://", "").gsub("www.", "").split("/").first.try(:downcase).to_s
	end
end