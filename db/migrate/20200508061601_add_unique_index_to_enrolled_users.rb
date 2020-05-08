class AddUniqueIndexToEnrolledUsers < ActiveRecord::Migration[6.0]
  def change
  	add_index :enrolled_course_users, [:user_id, :course_id], unique: true
  end
end
