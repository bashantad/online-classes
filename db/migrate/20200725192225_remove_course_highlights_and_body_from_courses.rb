class RemoveCourseHighlightsAndBodyFromCourses < ActiveRecord::Migration[6.0]
  def change
    remove_column :courses, :body, :text
    remove_column :courses, :course_highlights, :text
  end
end
