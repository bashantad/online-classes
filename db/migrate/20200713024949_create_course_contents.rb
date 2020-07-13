class CreateCourseContents < ActiveRecord::Migration[6.0]
  def change
    create_table :course_contents do |t|
      t.string :title
      t.text :description
      t.string :duration
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
