class AddCourseIdAndTitleToConversations < ActiveRecord::Migration[6.0]
  def change
    add_reference :conversations, :course, null: true, foreign_key: true
  end
end
