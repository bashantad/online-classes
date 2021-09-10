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
		["amadeus.com", "compass.com", "arraytechinc.com", "concentrix.com", "alteryx.com", "acvauctions.com", "c3.ai", "alkami.com", "alarm.com", "arrow.com", "avnet.com", "blackberry.com", "blackbaud.com", "cmcmaterials.com", "cerence.com", "cirrus.com", "crowdstrike.com", "commvault.com", "cloudera.com", "amkor.com", "ambarella.com", "appian.com", "asana.com", "coinbase.com", "bandwidth.com", "blackline.com", "bumble.com", "box.com", "calix.com", "domo.com", "nttdata.com", "dqsolar.com", "evertecinc.com", "facebook.com", "himax.com.tw", "en.ksyun.com", "jabil.com", "endava.com", "docusign.com", "3dsystems.com", "datadoghq.com", "desktopmetal.com", "digitalocean.com", "doubleverify.com", "8x8.com", "e2open.com", "everbridge.com", "flex.com", "flywire.com", "shift4.com", "jfrog.com", "guidewire.com", "kns.com", "jamf.com", "hubspot.com", "j2global.com", "latticesemi.com", "lumentum.com", "knowbe4.com", "liveperson.com", "luminartech.com", "lyft.com", "", "q2.com", "sea.com", "shoals.com", "semrush.com", "ni.com", "datto.com", "microstrategy.com", "cloudflare.com", "ncino.com", "ontoinnovation.com", "newrelic.com", "nutanix.com", "pagerduty.com", "siliconmotion.com", "olo.com", "qualcomm.com", "uipath.com", "macom.com", "pega.com", "anaplan.com", "plexus.com", "power.com", "liveramp.com", "qualys.com", "sailpoint.com", "sanmina.com", "rambus.com", "rackspace.com", "saic.com", "insight.com", "netscout.com", "ringcentral.com", "vertexinc.com", "auo.com", "global.sharp", "clearme.com", "", "cccis.com", "silabs.com", "smartsheet.com", "cdkglobal.com", "us.sunpower.com", "sitime.com", "squarespace.com", "sumologic.com", "semtech.com", "snowflake.com", "atlassian.com", "splunk.com", "sproutsocial.com", "towersemi.com", "squareup.com", "twitter.com", "viasat.com", "solarwinds.com", "teradata.com", "workiva.com", "tenable.com", "telos.com", "tuya.com", "unity.com", "varonis.com", "vimeo.com", "xperi.com", "xerox.com", "fleetcor.com", "", "", "", "", "irobot.com", "ciena.com", "fabrinet.com", "sensata.com", "sumcosi.com", "ii-vi.com", "besi.com", "cricut.com", "canadiansolar.com", "synaptics.com", "vicorpower.com", "novanta.com", "", "maxar.com", "twilio.com", "", "fiverr.com", "ams.com", "epson.com", "", "powerschool.com", "", "avast.com", "", "is.com", "stamps.com", "computershare.com", "teamviewer.com", "paycor.com", "taskus.com", "darktrace.com", "chindatagroup.com", "atos.net", "softwareag.com", "alight.com", "riskified.com", "duolingo.com", "kinaxis.com", "sprinklr.com", "enghouse.com", "altium.com", "descartes.com", "chinasofti.com", "", "", "cdw.com", "gartner.com", "zoominfo.com", "verisign.com", "cgi.com", "vtech.com", "", "dlocal.com", "pagseguro.com", "docebo.com", "radware.com", "microvision.com", "microsoft.com", "intuit.com", "infosys.com", "autodesk.com", "workday.com", "vmware.com", "adyen.com", "palantir.com", "cognizant.com", "okta.com", "zscaler.com", "epam.com", "ansys.com", "capgemini.com", "nexi.it", "topicus.com", "matterport.com", "payoneer.com", "csdisco.com", "merriam-webster.com", "marketwiseinc.com", "zendesk.com", "meridianlink.com", "paycom.com", "zuora.com", "paloaltonetworks.com", "amazon.com", "sap.com", "fisglobal.com", "synopsys.com", "csisoftware.com", "nri.com", "godaddy.com", "tylertech.com", "nice.com", "akamai.com", "aciworldwide.com", "afterpay.com", "checkpoint.com", "ceridian.com", "stone.co", "monday.com", "avalara.com", "opentext.com", "nuvei.com", "confluent.io", "elastic.co", "sentinelone.com", "leidos.com", "xero.com", "fico.com", "wix.com", "f5.com", "mcafee.com", "lightspeedhq.com", "manh.com", "dolby.com", "avepoint.com", "csiweb.com", "didiglobal.com", "wise.com", "procore.com", "thesagegroup.com", "temenos.com", "ctc-g.co.jp", "kainos.com", "intapp.com", "wisetechglobal.com", "en.kingdee.com", "tis.com", "paysafe.com", "travelskyir.com", "vtex.com", "evercommerce.com", "blend.com", "kahoot.com", "n-able.com", "microfocus.com", "adobe.com", "allegromicro.com", "altair.com", "appfolio.com", "aspentech.com", "brooks.com", "caci.com", "corsair.com", "cornerstoneondemand.com", "coupa.com", "commscope.com", "cyberark.com", "duckcreek.com", "investvoyager.com", "clarivate.com", "marqeta.com", "jackhenry.com", "five9.com", "affirm.com", "euronetworldwide.com", "riotblockchain.com", "pingidentity.com", "onepeloton.com", "networkinternational.ae", "gds-services.com", "diodes.com", "amdocs.com", "envestnet.com", "exlservice.com", "fireeye.com", "formfactor.com", "fastly.com", "ipgphotonics.com", "digitalturbine.com", "bill.com", "littelfuse.com", "medallia.com", "maxlinear.com", "servicenow.com", "paymentus.com", "purestorage.com", "momentive.com", "sabre.com", "echostar.com", "spscommerce.com", "sykes.com", "thetradedesk.com", "viavisolutions.com", "qualtrics.com", "wexinc.com", "jinkosolar.com", "skillz.com", "snapchat.com", "stem.com", "vontier.com", "dena.com", "telusinternational.com", "mimecast.com", "juniper.net", "oled.com", "perficient.com", "repay.com", "rapid7.com", "synnexcorp.com", "verint.com", "walkme.com", "pros.com", "griddynamics.com", "cognyte.com", "ocft.com", "couchbase.com", "latch.com", "esker.com", "avaya.com", "yext.com", "pl.asseco.com", "unisys.com", "eventbrite.com", "switch.com", "lg.com", "aactechnologies.com", "rohm.com", "casio.com", "corp.kaltura.com", "sonos.com", "novami.com", "rogerscorp.com", "vizio.com", "escotechnologies.com", "pinterest.com", "airbnb.com", "sunrun.com", "coherent.com", "atotech.com", "weedmaps.com", "eplus.com", "pubmatic.com", "yallatech.ae", "materialise.com", "paya.com", "evopayments.com", "qiwi.com", "a10networks.com", "on24.com", "karooooo.com", "zenvia.com", "instructure.com", "ebix.com", "riministreet.com", "amsoftware.com", "channeladvisor.com", "cantaloupe.com", "cyxtera.com", "veritone.com", "livevox.com", "tecsys.com", "katapult.com", "cielo.co.za", "pushpay.com", "allot.com", "support.com", "digimarc.com", "appen.com", "cleanspark.com", "wipro.com", "basehq.com", "opera.com", "yuntongxun.com", "tomtom.com", "life360.com", "quadient.com", "silverlakeaxis.com", "peakfintechgroup.com", "seeingmachines.com", "darkpulse.com", "sbtechnology.net", "rand.com", "iposcoop.com", "charge.enterprises", "blueprism.com", "greensky.com", "wetradegroup.com", "globalblue.com", "magicsoftware.com", "humblpay.com", "realmatters.com", "cerberussentinel.com", "bambuser.com", "chinayouzan.com", "rib-software.com", "vishay.com", "yeahka.com", "convergetp.com", "trendmicro.com", "ncr.com", "mantech.com", "spirent.com", "zoom.us", "tesla.com", "oracle.com", "shopify.com", "ibm.com", "fiserv.com", "3ds.com", "fortinet.com", "cadence.com", "robinhood.com", "fujitsu.com", "applovin.com", "indracompany.com", "csgi.com", "secureworks.com", "sapiens.com", "zetaglobal.com", "bit-digital.com", "absolute.com", "pexip.com", "billtrust.com", "jiguang.cn", "salesforce.com", "uber.com", "mongodb.com", "broadridge.com", "dynatrace.com", "bentley.com", "nuance.com", "ptc.com", "paylocity.com", "globant.com", "citrix.com", "dropbox.com", "blackknightinc.com", "proofpoint.com", "progress.com", "fulltruckalliance.com", "nortonlifelock.com", "genpact.com", "dxc.com", "ttec.com", "partech.com", "formulasystems.com", "agilysys.com", "modeln.com", "uplandsoftware.com", "miteksystems.com", "i3verticals.com", "dieboldnixdorf.com", "pdf.com", "onespan.com", "thehackettgroup.com", "bottomline.com", "qad.com", "conduent.com", "service.sosyun.com", "agora.io", "dnb.com", "itron.com", "roblox.com", "21vianet.com", "sunnova.com", "mksinst.com", "accenture.com", "ssctech.com", "bigcommerce.com", "intermexonline.com", "tucows.com", "porchgroup.com", "9fgroup.com"]		
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
					puts "===== had an issue with #{sitename} #{e.message}"
				end
				interval = arr.sample
				sleep interval
			end
		end
	end	
end
