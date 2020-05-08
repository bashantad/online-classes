class AddIsGroupToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :is_group, :boolean, default: false
  end
end
