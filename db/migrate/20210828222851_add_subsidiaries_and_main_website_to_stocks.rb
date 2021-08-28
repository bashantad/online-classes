class AddSubsidiariesAndMainWebsiteToStocks < ActiveRecord::Migration[6.0]
  def change
    add_column :stocks, :subsidiaries, :string
    add_column :stocks, :main_website, :text
  end
end
