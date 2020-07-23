class CreateAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :assignments do |t|
      t.string :question
      t.text :instructions
      t.integer :points
      t.datetime :due_date
      t.references :chapter, null: false, foreign_key: true

      t.timestamps
    end
  end
end
