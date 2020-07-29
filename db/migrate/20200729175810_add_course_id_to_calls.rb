class AddCourseIdToCalls < ActiveRecord::Migration[6.0]
  def change
    add_reference :calls, :course, null: true, foreign_key: true
  end
end
