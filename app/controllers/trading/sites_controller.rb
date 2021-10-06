class Trading::SitesController < Trading::BaseController
	def index
		company_urls = Site.all.collect(&:company_url).compact.uniq
		if params[:is_main] == "true"
			sites = Site.where(:company_url => company_urls, :is_main => true).order("stock_id")
		else
			sites = Site.where(:company_url => company_urls).order("stock_id")
		end
		
		abs_percentage = (params[:abs_percentage] || 20).to_i
		last_number_of_days = (params[:last_number_of_days] || 10).to_i
		@histories = SiteHistory.where("created_at > ?", last_number_of_days.days.ago).where(:site_id => sites.collect(&:id)).sort do |a, b|
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

	def static
		@sites = [
			"lennar.com",
			"erytech.com",
			"inventivapharma.com",
			"autozone.com",
			"neogen.com",
			"apogeedigital.com",
			"fedex.com",
			"adobe.com",
			"auroragov.org",
			"stitchfix.com",
			"isoray.com",
			"innovage.com",
			"generalmills.com",
			"gmtresearch.com",
			"blackberry.com",
			"kbhome.com",
			"hbfuller.com",
			"steelcase.com",
			"vintagewineestates.com",
			"accenture.com",
			"darden.com",
			"riteaid.com",
			"endava.com",
			"dynatronics.com",
			"nike.com",
			"costco.com",
			"trip.com",
			"vail.com",
			"progress.com",
			"aar.org",
			"calamp.com",
			"agtc.com",
			"inmedpharma.com",
			"researchsolutions.com",
		]
	end
end