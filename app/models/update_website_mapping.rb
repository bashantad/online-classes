class UpdateWebsiteMapping
  def self.update_websites
    Stock.find_by(:ticker => 'MSFT').update(:website => 'https://www.microsoft.com')
    Stock.find_by(:ticker => 'ADBE').update(:website => 'https://www.adobe.com')
    Stock.find_by(:ticker => 'CRM').update(:website => 'https://www.salesforce.com')
  end
end
