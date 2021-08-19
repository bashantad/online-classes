class CreateStockPrices < ActiveRecord::Migration[6.0]
  def change
    create_table :stock_prices do |t|
      t.date :date
      t.float :open_price
      t.float :high_price
      t.float :close_price
      t.float :low_price
      t.float :adjusted_close_price
      t.integer :volume
      t.belongs_to :stock       

      t.timestamps
    end
    add_index :stock_prices, [:stock_id, :date], unique: true
  end
end
