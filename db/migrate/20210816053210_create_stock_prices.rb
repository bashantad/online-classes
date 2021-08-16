class CreateStockPrices < ActiveRecord::Migration[6.0]
  def change
    create_table :stock_prices do |t|
      t.float :price
      t.belongs_to :stock

      t.timestamps
    end
  end
end
