class AddApprovedToCourses < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :approved, :boolean, :default => false
  end
end
