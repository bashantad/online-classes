class AddCourseIdAndTitleToConversations < ActiveRecord::Migration[6.0]
  def change
    add_reference :conversations, :course, null: true, foreign_key: true
    add_column :conversations, :title, :string
  end
end
