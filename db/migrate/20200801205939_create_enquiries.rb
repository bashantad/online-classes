class CreateEnquiries < ActiveRecord::Migration[6.0]
  def change
    create_table :enquiries do |t|
      t.string :full_name
      t.string :email
      t.string :enquiry_type
      t.text :message
      t.string :phone
      t.string :client_ip
      t.datetime :resolved_at

      t.timestamps
    end
  end
end
