class AddShortBioToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :short_bio, :text
    add_column :users, :linkedin_url, :text
    add_column :users, :twitter_url, :text
    add_column :users, :is_teacher, :boolean, default: false
  end
end
