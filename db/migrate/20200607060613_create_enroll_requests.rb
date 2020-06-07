class CreateEnrollRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :enroll_requests do |t|
      t.references :user, null: true, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.string :full_name
      t.string :email

      t.timestamps
    end
  end
end
