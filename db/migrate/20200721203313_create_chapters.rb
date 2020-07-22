class CreateChapters < ActiveRecord::Migration[6.0]
  def change
    create_table :chapters do |t|
      t.string :title
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
    add_index :chapters, [:course_id, :title], unique: true
  end
end
