class CreateCalls < ActiveRecord::Migration[6.0]
  def change
    create_table :calls do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :no_of_allowed_users, default: 5
      t.string :call_code
      t.timestamps
    end
  end
end
