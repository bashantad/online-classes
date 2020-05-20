class RenameConversationUserToConversationEnrolledUser < ActiveRecord::Migration[6.0]
  def change
    rename_table :conversation_users, :conversation_enrolled_users
  end
end
