class AddPhoneToEnrollRequests < ActiveRecord::Migration[6.0]
  def change
    add_column :enroll_requests, :phone, :string
  end
end
