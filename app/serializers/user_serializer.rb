class UserSerializer < ActiveModel::Serializer
  	attributes :id, :email, :full_name, :short_bio, :linkedin_url, :twitter_url, :is_teacher, :avatar_image_urls
  	has_many :conversations do
  		object.conversations.individuals
  	end
  	has_many :enrolled_courses
		has_many :educations
		has_many :experiences
  	has_many :user_message_notifications do
			UserMessageNotification.hashify_message_notification(object)
  	end
end
