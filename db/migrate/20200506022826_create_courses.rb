class CreateCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.text :body
      t.references :user, null: false, foreign_key: true
      t.string :website
      t.text :course_for
      t.float :price
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
