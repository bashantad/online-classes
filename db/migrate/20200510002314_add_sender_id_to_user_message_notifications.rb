class AddSenderIdToUserMessageNotifications < ActiveRecord::Migration[6.0]
  def change
  	add_reference :user_message_notifications, :sender, references: :users, index: true
  end
end
