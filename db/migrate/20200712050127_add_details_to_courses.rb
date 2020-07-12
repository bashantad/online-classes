class AddDetailsToCourses < ActiveRecord::Migration[6.0]
  def change
  	add_column :courses, :short_description,:text
    add_column :courses, :course_highlights, :text
    add_column :courses, :duration, :string
    add_column :courses, :no_of_lessons, :integer
    add_column :courses, :level, :string
  end
end
