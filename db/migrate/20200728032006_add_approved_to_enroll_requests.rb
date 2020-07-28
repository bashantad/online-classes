class AddApprovedToEnrollRequests < ActiveRecord::Migration[6.0]
  def change
    add_column :enroll_requests, :approved, :boolean
  end
end
