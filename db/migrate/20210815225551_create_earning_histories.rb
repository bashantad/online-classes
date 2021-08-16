class CreateEarningHistories < ActiveRecord::Migration[6.0]
  def change
    create_table :earning_histories do |t|
      t.date :earning_date
      t.belongs_to :stock
    end
  end
end
