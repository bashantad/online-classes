class AddChapterIdToCourseContents < ActiveRecord::Migration[6.0]
  def change
    add_reference :course_contents, :chapter, null: false, foreign_key: true
  end
end
