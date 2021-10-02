class AddIsInternationalToSites < ActiveRecord::Migration[6.0]
  def change
    add_column :sites, :is_international, :boolean
  end
end
