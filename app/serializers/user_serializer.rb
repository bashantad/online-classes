class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name
  has_many :enrolled_courses
  has_many :user_message_notifications do
  	object.user_message_notifications.unread
  end
end
