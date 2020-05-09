class CreateUserMessageNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :user_message_notifications do |t|
      t.references :user, null: false, foreign_key: true
      t.references :message, null: false, foreign_key: true
      t.boolean :read, default: false

      t.timestamps
    end
  end
end
