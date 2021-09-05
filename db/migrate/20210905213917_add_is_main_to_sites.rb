class AddIsMainToSites < ActiveRecord::Migration[6.0]
  def change
    add_column :sites, :is_main, :boolean, :default => false
  end
end
