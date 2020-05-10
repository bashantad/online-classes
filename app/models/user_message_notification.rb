class UserMessageNotification < ApplicationRecord
  belongs_to :user
  belongs_to :message

  scope :unread, -> { where(read: false) }
  scope :read, -> { where(read: true) }

  def self.hashify_message_notification(object)
  	arr = {}
  	object.user_message_notifications.unread.each do |notification|
  		arr[notification.sender_id] ||= []
  		arr[notification.sender_id] << notification.message_id
  	end
  	arr
  end

  def mark_as_read
    self.update(read: true)
  end
end
