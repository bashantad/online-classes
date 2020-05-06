class CreateEnrolledCourseUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :enrolled_course_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
