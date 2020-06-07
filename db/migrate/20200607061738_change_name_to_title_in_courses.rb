class ChangeNameToTitleInCourses < ActiveRecord::Migration[6.0]
  def change
    rename_column :courses, :name, :title
  end
end
