class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.text :comment
      t.integer :rating
      t.bigint  :reviewable_id
      t.string  :reviewable_type
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :reviews, [:reviewable_type, :reviewable_id]
  end
end
