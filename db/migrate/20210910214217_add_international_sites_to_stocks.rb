class AddInternationalSitesToStocks < ActiveRecord::Migration[6.0]
  def change
    add_column :stocks, :international_sites, :text
  end
end
