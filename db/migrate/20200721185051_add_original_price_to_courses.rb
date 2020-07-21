class AddOriginalPriceToCourses < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :discount_percentage, :integer, default: 0
  end
end
