class RemoveDescriptionFromCourseContents < ActiveRecord::Migration[6.0]
  def change
    remove_column :course_contents, :description, :text
  end
end
