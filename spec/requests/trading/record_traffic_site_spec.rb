require "rails_helper"

RSpec.describe "Records traffic", type: :request do
	def save_file_into_file(ranks, engagements, engagement_string, file_handle)
		sitename, country, country_rank, start_rank, end_rank = ranks
		daily_page_views, daily_page_views_percentage, daily_time_on_site, daily_time_on_site_percentage, bounce_rate, bounce_rate_percentage = engagements
		data = {
			:sitename => sitename,
			:country => country,
			:country_rank => country_rank,
			:start_rank => start_rank,
			:end_rank => end_rank,
			:daily_page_views => daily_page_views,
			:daily_page_views_percentage => daily_page_views_percentage,
			:daily_time_on_site => daily_time_on_site,
			:daily_time_on_site_percentage => daily_time_on_site_percentage,
			:bounce_rate => bounce_rate,
			:bounce_rate_percentage => bounce_rate_percentage,
			:engagement_string => engagement_string,
		}
		file_handle.puts data.to_json
	end

	def fetch_traffic_and_save_in_file(sitename, file_handle)
		visit "https://alexa.com/siteinfo/#{sitename}#section_traffic"
		country_tag       = find("#CountryRank").text.split("\n")
		country           = country_tag.first
		country_rank      = country_tag.last.gsub(",", "")
		start_rank        = find(".start-rank .rank").text.gsub(",", "")
		end_rank          = find(".end-rank .rank").text.gsub(",", "")
		engagement_string = find(".engagement").text
		engagements       = engagement_string.split("\n").select { |a| !a.scan(/\d/).empty? }[1..-1]
		ranks             = [sitename, country, country_rank, start_rank, end_rank]
		save_file_into_file(ranks, engagements, engagement_string, file_handle)
	end

	def sites_to_import
		["chinasofti.com", "couchbase.com", "latch.com", "esker.com", "indracompany.com", "ir.pros.com", "pl.asseco.com", "partech.com", "qad.com", "cognyte.com", "investors.billtrust.com", "avaya.com", "yext.com", "radware.com", "corp.kaltura.com", "blueprism.com", "eventbrite.com", "csiweb.com", "conduent.com", "secureworks.com", "sapiens.com", "cyxtera.com", "eplus.com", "pubmatic.com", "greensky.com", "yallatech.ae", "cielo.co.za", "bottomline.com", "avepoint.com", "griddynamics.com", "materialise.com", "agilysys.com", "paya.com", "modeln.com", "appen.com", "evopayments.com", "uplandsoftware.com", "basehq.com", "investor.opera.com", "a10networks.com", "on24.com", "miteksystems.com", "tomtom.com", "life360.com", "quadient.com", "karooooo.com", "i3verticals.com", "ir.yuntongxun.com", "instructure.com", "ebix.com", "dieboldnixdorf.com", "riministreet.com", "amsoftware.com", "tucows.com", "channeladvisor.com", "onespan.com", "cantaloupe.com", "silverlakeaxis.com", "investors.zenvia.com", "peakfintechgroup.com", "veritone.com", "corporate.intermexonline.com", "livevox.com", "tecsys.com", "katapult.com", "thehackettgroup.com", "seeingmachines.com", "allot.com", "darkpulse.com", "sbtechnology.net", "investor.qiwi.com", "support.com", "digimarc.com", "rand.com", "cleanspark.com", "ir.9fgroup.com", "iposcoop.com", "charge.enterprises", "wipro.com", "chinayouzan.com", "rib-software.com", "yeahka.com", "convergetp.com", "ocft.com", "unisys.com", "csgi.com", "formulasystems.com", "pushpay.com", "zetaglobal.com", "wetradegroup.com", "globalblue.com", "magicsoftware.com", "humblpay.com", "investor.pexip.com", "pdf.com", "realmatters.com", "bit-digital.com", "absolute.com", "cerberussentinel.com", "service.sosyun.com", "bambuser.com", "ir.jiguang.cn", "investors.avast.com", "porch.com"]
	end

	it "records Alexa history" do
		arr = (2..5).to_a
		data = []
		file = Rails.root.join("spec/files/traffic_site_history_alexa_data.txt")
		open(file, 'w') do |file_handle|
			(sites_to_import.shuffle).each do |sitename|
				begin
					data << fetch_traffic_and_save_in_file(sitename, file_handle)
					puts "Finished fetching data for #{sitename}"
				rescue => e
					puts "===== had an issue with #{sitename}"
				end
				interval = arr.sample
				sleep interval
			end
		end
	end	
end
