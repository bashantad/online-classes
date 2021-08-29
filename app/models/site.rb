class Site < ApplicationRecord
	belongs_to :stock
	has_many :site_histories

	def self.create_default_sites
		Stock.all.each do |stock|
			website = stock.display_website
			next if website.blank?
			stock.sites.create(:company_url => website)
		end
	end
end
