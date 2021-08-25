class AddWeekToStockPrices < ActiveRecord::Migration[6.0]
  def change
    add_column :stock_prices, :day_of_the_week, :string
    add_column :stock_prices, :week_number, :integer
    add_column :stock_prices, :price_change_percentage, :float
  end
end
