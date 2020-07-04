class UserSerializer < ActiveModel::Serializer
  	attributes :id, :email, :full_name, :avatar_image_urls
  	has_many :conversations do
  		object.conversations.individuals
  	end
  	has_many :enrolled_courses
  	has_many :user_message_notifications do
			UserMessageNotification.hashify_message_notification(object)
  	end
end
