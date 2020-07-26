class CreateAssignmentSubmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :assignment_submissions do |t|
      t.datetime :submission_date
      t.references :user, null: false, foreign_key: true
      t.references :assignment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
