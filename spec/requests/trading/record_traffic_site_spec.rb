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

	def main_sites
		["amadeus.com", "compass.com", "arraytechinc.com", "concentrix.com", "alteryx.com", "acvauctions.com", "c3.ai", "alkami.com", "alarm.com", "arrow.com", "avnet.com", "blackberry.com", "blackbaud.com", "cmcmaterials.com", "cerence.com", "cirrus.com", "crowdstrike.com", "commvault.com", "cloudera.com", "amkor.com", "ambarella.com", "appian.com", "asana.com", "coinbase.com", "bandwidth.com", "blackline.com", "bumble.com", "box.com", "calix.com", "domo.com", "nttdata.com", "dqsolar.com", "evertecinc.com", "facebook.com", "himax.com.tw", "en.ksyun.com", "jabil.com", "endava.com", "docusign.com", "3dsystems.com", "datadoghq.com", "desktopmetal.com", "digitalocean.com", "doubleverify.com", "8x8.com", "e2open.com", "everbridge.com", "flex.com", "flywire.com", "shift4.com", "jfrog.com", "guidewire.com", "kns.com", "jamf.com", "hubspot.com", "j2global.com", "latticesemi.com", "lumentum.com", "knowbe4.com", "liveperson.com", "luminartech.com", "lyft.com", "", "q2.com", "sea.com", "shoals.com", "semrush.com", "ni.com", "datto.com", "microstrategy.com", "cloudflare.com", "ncino.com", "ontoinnovation.com", "newrelic.com", "nutanix.com", "pagerduty.com", "siliconmotion.com", "olo.com", "qualcomm.com", "uipath.com", "macom.com", "pega.com", "anaplan.com", "plexus.com", "power.com", "liveramp.com", "qualys.com", "sailpoint.com", "sanmina.com", "rambus.com", "rackspace.com", "saic.com", "insight.com", "netscout.com", "ringcentral.com", "vertexinc.com", "auo.com", "global.sharp", "clearme.com", "", "cccis.com", "silabs.com", "smartsheet.com", "cdkglobal.com", "us.sunpower.com", "sitime.com", "squarespace.com", "sumologic.com", "semtech.com", "snowflake.com", "atlassian.com", "splunk.com", "sproutsocial.com", "towersemi.com", "squareup.com", "twitter.com", "viasat.com", "solarwinds.com", "teradata.com", "workiva.com", "tenable.com", "telos.com", "tuya.com", "unity.com", "varonis.com", "vimeo.com", "xperi.com", "xerox.com", "fleetcor.com", "", "", "", "", "irobot.com", "ciena.com", "fabrinet.com", "sensata.com", "sumcosi.com", "ii-vi.com", "besi.com", "cricut.com", "canadiansolar.com", "synaptics.com", "vicorpower.com", "novanta.com", "", "maxar.com", "twilio.com", "", "fiverr.com", "ams.com", "epson.com", "", "powerschool.com", "", "avast.com", "", "is.com", "stamps.com", "computershare.com", "teamviewer.com", "paycor.com", "taskus.com", "darktrace.com", "chindatagroup.com", "atos.net", "softwareag.com", "alight.com", "riskified.com", "duolingo.com", "kinaxis.com", "sprinklr.com", "enghouse.com", "altium.com", "descartes.com", "chinasofti.com", "", "", "cdw.com", "gartner.com", "zoominfo.com", "verisign.com", "cgi.com", "vtech.com", "", "dlocal.com", "pagseguro.com", "docebo.com", "radware.com", "microvision.com", "microsoft.com", "intuit.com", "infosys.com", "autodesk.com", "workday.com", "vmware.com", "adyen.com", "palantir.com", "cognizant.com", "okta.com", "zscaler.com", "epam.com", "ansys.com", "capgemini.com", "nexi.it", "topicus.com", "matterport.com", "payoneer.com", "csdisco.com", "merriam-webster.com", "marketwiseinc.com", "zendesk.com", "meridianlink.com", "paycom.com", "zuora.com", "paloaltonetworks.com", "amazon.com", "sap.com", "fisglobal.com", "synopsys.com", "csisoftware.com", "nri.com", "godaddy.com", "tylertech.com", "nice.com", "akamai.com", "aciworldwide.com", "afterpay.com", "checkpoint.com", "ceridian.com", "stone.co", "monday.com", "avalara.com", "opentext.com", "nuvei.com", "confluent.io", "elastic.co", "sentinelone.com", "leidos.com", "xero.com", "fico.com", "wix.com", "f5.com", "mcafee.com", "lightspeedhq.com", "manh.com", "dolby.com", "avepoint.com", "csiweb.com", "didiglobal.com", "wise.com", "procore.com", "thesagegroup.com", "temenos.com", "ctc-g.co.jp", "kainos.com", "intapp.com", "wisetechglobal.com", "en.kingdee.com", "tis.com", "paysafe.com", "travelskyir.com", "vtex.com", "evercommerce.com", "blend.com", "kahoot.com", "n-able.com", "microfocus.com", "adobe.com", "allegromicro.com", "altair.com", "appfolio.com", "aspentech.com", "brooks.com", "caci.com", "corsair.com", "cornerstoneondemand.com", "coupa.com", "commscope.com", "cyberark.com", "duckcreek.com", "investvoyager.com", "clarivate.com", "marqeta.com", "jackhenry.com", "five9.com", "affirm.com", "euronetworldwide.com", "riotblockchain.com", "pingidentity.com", "onepeloton.com", "networkinternational.ae", "gds-services.com", "diodes.com", "amdocs.com", "envestnet.com", "exlservice.com", "fireeye.com", "formfactor.com", "fastly.com", "ipgphotonics.com", "digitalturbine.com", "bill.com", "littelfuse.com", "medallia.com", "maxlinear.com", "servicenow.com", "paymentus.com", "purestorage.com", "momentive.com", "sabre.com", "echostar.com", "spscommerce.com", "sykes.com", "thetradedesk.com", "viavisolutions.com", "qualtrics.com", "wexinc.com", "jinkosolar.com", "skillz.com", "snapchat.com", "stem.com", "vontier.com", "dena.com", "telusinternational.com", "mimecast.com", "juniper.net", "oled.com", "perficient.com", "repay.com", "rapid7.com", "synnexcorp.com", "verint.com", "walkme.com", "pros.com", "griddynamics.com", "cognyte.com", "ocft.com", "couchbase.com", "latch.com", "esker.com", "avaya.com", "yext.com", "pl.asseco.com", "unisys.com", "eventbrite.com", "switch.com", "lg.com", "aactechnologies.com", "rohm.com", "casio.com", "corp.kaltura.com", "sonos.com", "novami.com", "rogerscorp.com", "vizio.com", "escotechnologies.com", "pinterest.com", "airbnb.com", "sunrun.com", "coherent.com", "atotech.com", "weedmaps.com", "eplus.com", "pubmatic.com", "yallatech.ae", "materialise.com", "paya.com", "evopayments.com", "qiwi.com", "a10networks.com", "on24.com", "karooooo.com", "zenvia.com", "instructure.com", "ebix.com", "riministreet.com", "amsoftware.com", "channeladvisor.com", "cantaloupe.com", "cyxtera.com", "veritone.com", "livevox.com", "tecsys.com", "katapult.com", "cielo.co.za", "pushpay.com", "allot.com", "support.com", "digimarc.com", "appen.com", "cleanspark.com", "wipro.com", "basehq.com", "opera.com", "yuntongxun.com", "tomtom.com", "life360.com", "quadient.com", "silverlakeaxis.com", "peakfintechgroup.com", "seeingmachines.com", "darkpulse.com", "sbtechnology.net", "rand.com", "iposcoop.com", "charge.enterprises", "blueprism.com", "greensky.com", "wetradegroup.com", "globalblue.com", "magicsoftware.com", "humblpay.com", "realmatters.com", "cerberussentinel.com", "bambuser.com", "chinayouzan.com", "rib-software.com", "vishay.com", "yeahka.com", "convergetp.com", "trendmicro.com", "ncr.com", "mantech.com", "spirent.com", "zoom.us", "tesla.com", "oracle.com", "shopify.com", "ibm.com", "fiserv.com", "3ds.com", "fortinet.com", "cadence.com", "robinhood.com", "fujitsu.com", "applovin.com", "indracompany.com", "csgi.com", "secureworks.com", "sapiens.com", "zetaglobal.com", "bit-digital.com", "absolute.com", "pexip.com", "billtrust.com", "jiguang.cn", "salesforce.com", "uber.com", "mongodb.com", "broadridge.com", "dynatrace.com", "bentley.com", "nuance.com", "ptc.com", "paylocity.com", "globant.com", "citrix.com", "dropbox.com", "blackknightinc.com", "proofpoint.com", "progress.com", "fulltruckalliance.com", "nortonlifelock.com", "genpact.com", "dxc.com", "ttec.com", "partech.com", "formulasystems.com", "agilysys.com", "modeln.com", "uplandsoftware.com", "miteksystems.com", "i3verticals.com", "dieboldnixdorf.com", "pdf.com", "onespan.com", "thehackettgroup.com", "bottomline.com", "qad.com", "conduent.com", "service.sosyun.com", "agora.io", "dnb.com", "itron.com", "roblox.com", "21vianet.com", "sunnova.com", "mksinst.com", "accenture.com", "ssctech.com", "bigcommerce.com", "intermexonline.com", "tucows.com", "porchgroup.com", "9fgroup.com"]
	end

	def subsidiaries
		["navitaire.com", "amadeus.co.uk", "autobagdrop.com.au", "meiko-japan.com", "levyrestaurants.com", "foodbuy.com", "tigerspike.com", "ctoscredit.com", "featurelabs.com", "maxdigital.com", "asi-assurance.org", "crunchbase.com", "palantir.com", "uipath.com", "salesforce.com", "ncino.com", "q2.com", "avaloq.com", "crunchbase.com", "pointcentral.com", "secure-i.com", "verical.com", "einfochips.com", "siliconexpert.com", "uk.farnell.com", "newark.com", "usielectronics.com", "secusmart.com", "watchdox.com", "blackberry.certicom.com", "solutions.yourcause.com", "smarttuition.com", "nozasearch.com", "kmgchemicals.com", "qedmrf.com", "elitetranslations.asia", "opalum.com", "mouser.com", "humio.com", "preempt.com", "mergr.com", "knowledge.hitachivantara.com", "zaubacorp.com", "buyandsell.gc.ca", "blog.fastforwardlabs.com", "wantedly.com", "hirednow.com.my", "sgpgrid.com", "bbs.fobshanghai.com", "vislab.it", "bisontrails.co", "voxbone.com", "signrequest.com", "wagonhq.com", "us.nttdata.com", "everis.com", "privatecore.com", "oculus.com", "whatsapp.com", "badger-technologies.com", "radiusinnovation.com", "kasalis.com", "levvel.io", "f6s.com", "springcm.com", "cimatron.com", "simbionix.com", "sqreen.com", "adaptive3d.com", "iroquois.com", "digitgaps.com", "gtnexus.com", "kinaxis.com", "blueyonder.com", "xmatters.com", "nixle.com", "connexient.com", "nextracker.com", "flexpowermodules.com", "sheldahl.com", "shift4shop.com", "venuenext.com", "web.futurepos.com", "vdoo.com", "conan.io", "cloudmunch.com", "onespan.com", "kpluss.com", "vmware.com", "mobileiron.com", "hexnode.com", "piesync.com", "thehustle.co", "corp.ign.com", "retailmenot.com", "icontact.com", "dvdo.com", "ramarfoods.com", "popcorntraining.com", "elpescador.com.br", "moovit.com", "mobileye.com", "arcimoto.com", "halocars.co", "flexdrive.com", "shopee.com", "garena.sg", "shopee.co.th", "solon.com", "digilent.com", "mccdaq.com", "awr.com", "strategyinc.net", "neumob.com", "eager.io", "marinercapitaladvisors.com", "fra.me", "rundeck.com", "bigtera.com", "firethornholdings.com", "royalwireless.in", "cloud-elements.com", "datafleets.com", "acxiom.com", "erpmaestro.com", "sci.com", "viking.com.tw", "jungledisk.com", "objectrocket.com", "halfaker.com", "peratonlabs.com", "hicks-ins.com", "insight.de", "tigerdirect.com", "datalinkcorp.com", "vssmonitoring.com", "tucana.com", "starburst.net.sg", "rclec.com", "dimelo.com", "rcvagroupllc.com", "auocrystal.com", "us.dynabook.com", "sharpindialimited.com", "legalzoom.com", "purely-solutions.com", "z-wavealliance.org", "brandfolder.com", "cvrconnect.com", "lightspeeddms.com", "opendealerexchange.com", "sunpower.maxeon.com", "exploretock.com", "unfold.com", "dflabs.com", "xenocs.com", "thinktilt.com", "goodsoftware.co", "trustar.co", "plumbr.io", "tpsemico.com", "weebly.com", "tidal.com", "orderahead.org", "scroll.com", "rig.net", "pingdom.com", "sentryone.com", "loggly.com", "onecloud.io", "telosid.com", "visuallive.com", "deltadna.com", "plasticscm.com", "magisto.com", "dts.com", "tessera.com", "dts-asia.com", "carear.com", "veenman.nl", "comdoc.com", "comdata.com", "afex.com", "clclodging.com", "irobot.co.uk", "irobot.it", "global.irobot.com", "blueplanet.com", "casix.com", "sensata.tradekorea.com", "customsensors.com", "gigavac.com", "rdcustomautomation.com", "fico.com", "csisolar.com", "mesia.com", "displaylink.com", "jadaktech.com", "celeramotion.com", "cambridgetechnology.com", "discover.digitalglobe.com", "mda.space", "sendgrid.com", "segment.com", "zipwhip.com", "veed.me", "clearvoice.com", "osram.com", "offer-ams-osram.com", "ixellence.com", "orient-watch.com", "epson.com.au", "epson.com.hk", "endicia.com", "shipworks.com", "shippingeasy.com", "trendminer.com", "jackbe.com", "connx.com", "dialogic.com", "enghouseinteractive.com", "vidyo.com", "datamyne.com", "macropoint.com", "shiptrackapp.com", "cdwg.com", "amplifiedit.com", "focal-point.com", "capterra.com", "softwareadvice.com", "evanta.com", "discoverorg.com", "clickagy.com", "swedyello.com", "thawte.com", "geotrust.com", "sensecorp.com", "paragonsol.net", "synergyconsulting.ae", "adyen.com", "paystack.com", "indiehackers.com", "zygotecnologia.com", "tmgroup.co.uk", "formetris.com", "intrahealth.com", "linkedin.com", "github.com", "nuance.com", "creditkarma.com", "mint.intuit.com", "tradegecko.com", "infosysbpm.com", "edgeverve.com", "panaya.com", "innovyze.com", "buildingconnected.com", "camplete.com", "adaptiveplanning.com", "peakon.com", "tanzu.vmware.com", "sase.vmware.com", "nyansa.com", "propellerinc.me", "cognizantsoftvision.com", "esg-mobility.com", "newsignature.com", "auth0.com", "azuqua.com", "smokescreen.io", "deltixlab.com", "continuuminnovation.com", "polsource.com", "lumerical.com", "agi.com", "phoenix-int.com", "smooch.io", "bridgecrew.io", "redlock.io", "sinefa.com", "audible.com", "zappos.com", "eu.wholefoodsmarket.com", "efunds.com", "chexsystems.com", "blackducksoftware.com", "scan.coverity.com", "codedx.com", "volarisgroup.com", "harriscomputer.com", "jonassoftware.com", "asggroup.com.au", "nridigital.com", "afternic.com", "mediatemple.net", "sucuri.net", "egov.com", "tylertech.irpass.com", "niceincontact.com", "niceactimize.com", "satmetrix.com", "inverse.ca", "krypt.co", "excelityglobal.com", "sponte.com.br", "gy.creditinfo.com", "mundipagg.com", "ttrus.com", "impendulo.com", "inposia.com", "carbonite.com", "webroot.com", "hightail.com", "lambdalabs.com", "dynetics.com", "gibbscox.com", "1901group.com", "myfico.com", "quadmetrics.com", "modalyst.co", "deviantart.com", "rise.ai", "volterra.io", "nginx.com", "shapesecurity.com", "via-corp.com", "n2ws.com", "kasten.io", "veeam.com", "fotolia.com", "mixamo.com", "workfront.com", "voxtel-llc.com", "bizdirectasia.com", "bloomberg.com", "edemsimulation.com", "simsolid.com", "univa.com", "rentlinx.com", "dynasty.com", "terrarrg.com", "boulderstrategiesllc.com", "copperminecapital.com", "hcgllcus.com", "ruro.com", "feejoygroup.com", "mastodondesign.com", "ascentvision.com", "caci.co.uk", "elgato.com", "scufgaming.com", "gmdu.net", "saba.com", "grovo.com", "dcrworkforce.com", "insight.rpxcorp.com", "thetradefinder.co.uk", "cpl.thalesgroup.com", "utilant.com", "info.edgeinsights.in", "lgo.group", "coinify.com", "cpaglobal.com", "markmonitor.com", "kopernio.com", "inferencesolutions.com", "xe.com", "pure-commerce.com", "megaport.com", "beacon.bio", "questarpipeline.com", "adaptive3d.com", "vindicia.com", "vubiquity.com", "projekt202.com", "yodlee.com", "moneyguidepro.com", "tamaracinc.com", "cloudvisory.com", "respond-software.com", "hpd-online.com", "frtmetrology.com", "cascademicrotech.com", "imperva.com", "cloudflare.com", "akamai.com", "menaranet.com", "investors.interpublic.com", "optigrate.com", "getdivvy.com", "ixys.com", "zilog.com", "livinglens.tv", "sense360.com", "cooladata.com", "nanosemitech.com", "elementai.com", "lightstep.com", "loomsystems.com", "compuverde.com", "getfeedback.com", "usabilla.com", "surveymonkey.com", "airpas.com", "sabrehospitality.com", "echostarmobile.com", "datamasons.com", "sps-europe.com", "assistanceservicesgroup.com", "sykescolombia.com", "spotx.tv", "springserve.com", "magnite.com", "toyota-tsusho.com", "xminstitute.com", "benefitexpress.info", "ca.tchweb.com", "enett.com", "jinkosolar.us", "peak.com", "rollicgames.com", "gram.gs", "vurb.com", "matcotools.com", "gilbarco.com", "teletracnavman.com", "travelinc.com", "live.iriam.com", "yourccc.com", "lionbridge.com", "dmarcanalyzer.com", "techtarget.com", "apstra.com", "128technology.com", "mist.com", "udcus.com", "adesisinc.com", "trifecta.com", "biopharminternational.com", "mybillingtree.com", "kontrolpayables.com", "alcide.io", "intsights.com", "netfort.com", "westconcomstor.com", "hyvesolutions.com", "tigerspike.com", "opinionlab.com", "foresee.com", "teligent.com", "nittiolearn.com", "thelittlebirdinc.com", "headshift.com", "access.trade.gov", "daxx.com", "morphl.io", "youtube.com", "fitbit.com", "unifysquare.com", "toneden.io", "wispry.com", "researchsquare.com", "lapis-semi.com", "micro.rohm.com", "kionix.com", "casio-human-sys.co.jp", "yamagata-casio.co.jp", "casio-europe.com", "rogersia.com", "arlonemd.com", "worldproperties.com", "inscape.tv", "aclara.com", "vacco.com", "doble.com", "instapaper.com", "pinterest.co.uk", "hoteltonight.com", "luckey.com", "vivintsolar.com", "easternlaser.en.made-in-china.com", "industrial.macdermidenthone.com", "hkw.co.uk", "macdermidenvio.com", "rapidfit.com", "firstbilling.com", "stewardshiptechnology.com", "universalpay.es", "npspayments.com", "tochka.com", "socio.events", "socialtables.com", "crowdcompass.com", "portfolium.com", "eesysoft.com", "in.via.com", "ebixcash.com", "milessoft.com", "logility.com", "ngcsoftware.com", "demandsolutions.com", "blueboard.io", "marketplacesinc.com", "vendingmarketwatch.com", "veritoneone.com", "machinebox.io", "speechiq.com", "p2klabs.com", "gridfabric.io", "capco.com", "topcoder.com", "appirio.com", "yoyogames.com", "pocosys.eu", "taiwantrade.com", "ultronix.com", "ecomal.com", "affirmtrust.com", "cardtronics.com", "payments.ncr.com", "retalixtraffic.com", "tapestrytech.com", "infozen.com", "maxwell.com", "bportugal.pt", "au1.aconex.com", "addthis.com", "globalknowledge.com", "oberlo.com", "tictail.com", "6river.com", "kyndryl.com", "redhat.com", "turbonomic.com", "clover.com", "cardconnect.com", "spendlabs.com", "solidworks.com", "medidata.com", "en.outscale.com", "panopta.com", "sken.ai", "accelops.com", "awr.com", "numeca.com", "chipestimate.com", "snacks.robinhood.com", "saytechnologies.com", "pfu.fujitsu.com", "shinko.co.jp", "run-edge.com", "mz.com", "peoplefun.com", "geewa.com", "sia.es", "prointec.es", "kitewheel.com", "csgservices.com", "tangotelecom.com", "calculo-sa.es", "netmotionsoftware.com", "sphere3d.com", "truecar.com", "swn.com", "tableau.com", "mulesoft.com", "pardot.com", "ubereats.com", "postmates.com", "careem.com", "mlab.com", "realm.io", "itiviti.com", "fi360.com", "advisorstream.com", "seequent.com", "orbitgt.com", "sensemetrics.com", "escription.com", "mcarbon.com", "multicorpinternational.com", "kepware.com", "arenasolutions.com", "ptcintl.com", "samepage.io", "cloudshiftgroup.com", "grupoassa.com", "bluecap.com", "wrike.com", "rightsignature.com", "cedexis.com", "hellosign.com", "docsend.com", "moji.co", "collateralanalytics.com", "topofmind.com", "docverify.com", "cloudmark.com", "intelisecure.com", "telerik.com", "lifelock.com", "avira.com", "us.norton.com", "rightpoint.com", "enquero.com", "riskcanvas.com", "luxoft.com", "service.sosyun.com", "fruitionpartners.nl", "percepta.com", "pargovernment-careers.silkroad.com", "romeresearchcorp.com", "springermiller.com", "sapiens.com", "tsgitsystems.com", "ofek-air.com", "agilisys.co.uk", "access.trade.gov", "litmos.com", "orientindia.in", "panviva.com", "cms.clickability.com", "secondstreet.com", "a2ia.com", "datachecker.nl", "idrnd.ai", "axia.i3merchant.com", "njoy.com", "igovsolution.com", "vietnamcredit.com.vn", "imagesoundsecurity.com.au", "cimetrix.com", "iglintels.com", "finextra.com", "savewithable.com", "legacyglobal.com", "cortexgroup.ai", "answerthink.com", "anasys.com", "precisionsoftware.com", "dys.com", "allocation.net", "compiqsolutions.com", "livebridgeinc.com", "capital-fs.co.uk", "oxfordclub.com", "stansberryresearch.com", "moneymappress.com", "packetzoom.com", "loomai.com", "newport.com", "spectra-physics.com", "esi.com", "avanade.com", "trivadis.com", "droga5.com", "intralinks.com", "advent.com", "ezesoft.com", "hover.com", "enom.com", "ting.com", "hireahelper.com", "get.fountain.com", "hoaic.com", "utmostinternational.com"]
	end

	def sites_to_import
		subsidiaries		
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
