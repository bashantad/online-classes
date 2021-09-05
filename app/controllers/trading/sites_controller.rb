class Trading::SitesController < Trading::BaseController
	def index
		stock_urls = Stock.all.collect(&:display_website).compact.uniq
		if params[:is_main] == "true"
			sites = Site.where(:company_url => stock_urls, :is_main => true)
		else
			sites = Site.where(:company_url => stock_urls)
		end
		
		abs_percentage = (params[:abs_percentage] || 20).to_i
		@histories = SiteHistory.where("created_at > ?", 30.days.ago).where(:site_id => sites.collect(&:id)).sort do |a, b|
			a.abs_percentage <=> b.abs_percentage
		end.select do |site|
			abs = site.abs_percentage > abs_percentage
			increasing = site.start_rank > site.end_rank
			if params[:negative] == "true"
				increasing = !increasing
			end
			abs && increasing
		end.reverse
	end
end