class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :website, :course_for, :price, :discount_percentage, :show_url, :image_urls, :short_description, :course_highlights, :duration, :no_of_lessons, :level
  has_many :chapters
  has_one :teacher
  has_one :category
  has_many :enrolled_users
  has_many :reviews
  has_many :conversations do
  	object.conversations.groups
  end
end
