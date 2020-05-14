class UserMessageNotification < ApplicationRecord
  belongs_to :user
  belongs_to :message

  scope :unread, -> { where(read: false) }
  scope :read, -> { where(read: true) }

  def self.hashify_message_notification(object)
  	arr = {}
    notifications = object.user_message_notifications.unread
    message_ids = notifications.collect(&:message_id)
    Message.where(id: message_ids).each do |message|
      arr[message.conversation_id] ||= []
      arr[message.conversation_id] << message.id
    end
  	arr
  end

  def mark_as_read
    self.update(read: true)
  end
end
