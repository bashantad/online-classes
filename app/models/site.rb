class Site < ApplicationRecord
	belongs_to :stock
	has_many :site_histories

	def self.create_default_sites
		Stock.all.each do |stock|
			create_default_sites_for_a_stock(stock)	
		end
	end

	def self.create_subsidiaris_sites
		Stock.all.each do |stock|
			create_subsidiaries_sites_for_a_stock(stock)
		end
	end

	def self.create_international_sites
		Stock.all.each do |stock|
			create_international_sites_for_a_stock(stock)
		end
	end

	def self.create_default_sites_for_a_stock(stock)
		website = stock.display_website
		return if website.blank?
		return if stock.sites.where(:company_url => website).present?
		stock.sites.create(:company_url => website, is_main: true)
	end

	def self.create_subsidiaries_sites_for_a_stock(stock)
		subsidiaries = stock.subsidiaries
		return if subsidiaries.blank?
		subsidiaries.split(",").each do |url|
			url = Site.extract_website(url)
			next if url.blank?
			url = url.strip
			next if url.include?("http:")
			next if stock.sites.where(:company_url => url).present?
			stock.sites.create(:company_url => url, is_main: false)
		end
	end

	def self.create_international_sites_for_a_stock(stock)
		international_sites = stock.international_sites
		return if international_sites.blank?
		international_sites.split("\r\n").each do |url|
			url = Site.extract_website(url)
			next if url.blank?
			url = url.strip
			next if url.include?("http:")
			next if stock.sites.where(:company_url => url).present?
			stock.sites.create(:company_url => url, is_main: false, is_international: true)
		end		
	end

	def self.extract_website(url)
		url.to_s.gsub("https://", "").gsub("www.", "").split("/").first.try(:downcase).to_s
	end
end