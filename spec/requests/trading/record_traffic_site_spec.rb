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
		["acvauctions.com", "c3.ai", "alkami.com", "alarm.com", "altair.com", "investor.agora.io", "appfolio.com", "adobe.com", "appian.com", "digitalturbine.com", "investors.affirm.com", "asana.com", "cmpsinc.com", "alteryx.com", "aspentech.com", "bandwidth.com", "blackberry.com", "bill.com", "blackline.com", "blackbaud.com", "bumble.com", "box.com", "caci.com", "calix.com", "cloudera.com", "concentrix.com", "coinbase.com", "coupa.com", "domo.com", "cerence.com", "crowdstrike.com", "cornerstoneondemand.com", "euronetworldwide.com", "luminartech.com", "commvault.com", "cyberark.com", "endava.com", "duckcreek.com", "datadoghq.com", "merriam-webster.com", "digitalocean.com", "docusign.com", "amdocs.com", "doubleverify.com", "8x8.com", "envestnet.com", "e2open.com", "everbridge.com", "evertecinc.com", "exlservice.com", "fireeye.com", "flywire.com", "shift4.com", "jfrog.com", "fastly.com", "guidewire.com", "hubspot.com", "jamf.com", "j2global.com", "en.ksyun.com", "knowbe4.com", "liveperson.com", "semrush.com", "medallia.com", "mimecast.com", "insight.com", "datto.com", "pingidentity.com", "microstrategy.com", "ni.com", "ncino.com", "cloudflare.com", "newrelic.com", "servicenow.com", "netscout.com", "nutanix.com", "olo.com", "uipath.com", "paymentus.com", "pagerduty.com", "pega.com", "anaplan.com", "perficient.com", "qualys.com", "investors.q2ebanking.com", "liveramp.com", "repay.com", "rapid7.com", "rackspace.com", "sabre.com", "saic.com", "sailpoint.com", "wexinc.com", "cccis.com", "smartsheet.com", "switch.com", "cdkglobal.com", "vertexinc.com", "snowflake.com", "synnexcorp.com", "splunk.com", "spscommerce.com", "sproutsocial.com", "squareup.com", "squarespace.com", "ir.21vianet.com", "stem.com", "sumologic.com", "solarwinds.com", "sykes.com", "teradata.com", "atlassian.com", "tenable.com", "telos.com", "thetradedesk.com", "tuya.com", "unity.com", "vimeo.com", "varonis.com", "verint.com", "workiva.com", "qualtrics.com", "xerox.com", "genpact.com", "telusinternational.com", "computershare.com", "tis.com", "teamviewer.com", "descartes.com", "paycor.com", "paysafe.com", "darktrace.com", "ncr.com", "atos.net", "alight.com", "vtex.com", "riskified.com", "duolingo.com", "kinaxis.com", "sprinklr.com", "softwareag.com", "ir.clearme.com", "altium.com", "investors.networkinternational.ae", "enghouse.com", "spirent.com", "en.wikipedia.org", "zendesk.com", "zoom.us", "zuora.com", "paloaltonetworks.com", "salesforce.com", "oracle.com", "accenture.com", "sap.com", "intuit.com", "ibm.com", "infosys.com", "fisglobal.com", "fiserv.com", "autodesk.com", "workday.com", "vmware.com", "fortinet.com", "synopsys.com", "cadence.com", "cognizant.com", "okta.com", "ir.didiglobal.com", "capgemini.com", "zscaler.com", "csisoftware.com", "epam.com", "ansys.com", "paycom.com", "afterpay.com", "cdw.com", "amadeus.com", "gartner.com", "mongodb.com", "nttdata.com", "verisign.com", "ringcentral.com", "nri.com", "cgi.com", "investors.powerschool.com", "taskus.com", "topicus.com", "blend.com", "matterport.com", "payoneer.com", "kahoot.com", "momentive.com", "docebo.com", "n-able.com", "marketwiseinc.com", "walkme.com", "meridianlink.com", "aciworldwide.com", "shopify.com", "adyen.com", "uber.com", "3ds.com", "palantir.com", "robinhood.com", "fujitsu.com", "applovin.com", "zoominfo.com", "broadridge.com", "dlocal.com", "ssa.gov", "tylertech.com", "nice.com", "bentley.com", "akamai.com", "nuvei.com", "checkpoint.com", "sentinelone.com", "ceridian.com", "xero.com", "stone.co", "permira.com", "monday.com", "nortonlifelock.com", "ptc.com", "lightspeedhq.com", "opentext.com", "paylocity.com", "confluent.io", "elastic.co", "marqeta.com", "wise.com", "globant.com", "fico.com", "citrix.com", "wix.com", "godaddy.com", "procore.com", "dropbox.com", "five9.com", "en.kingdee.com", "thesagegroup.com", "blackknightinc.com", "mcafee.com", "manh.com", "proofpoint.com", "investors.gds-services.com", "ctc-g.co.jp", "kainos.com", "intapp.com", "progress.com", "fleetcor.com", "nexi.it", "investors.pagseguro.com", "dynatrace.com", "nuance.com", "lyft.com", "clarivate.com", "avalara.com", "wisetechglobal.com", "leidos.com", "jackhenry.com", "f5.com", "temenos.com", "dolby.com", "is.com", "dxc.com", "trendmicro.com", "stamps.com", "travelskyir.com", "ttec.com", "evercommerce.com", "bigcommerce.com", "riotblockchain.com", "chindatagroup.com", "mantech.com", "csdisco.com", "merriam-webster.com", "microfocus.com", "investvoyager.com"]
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
