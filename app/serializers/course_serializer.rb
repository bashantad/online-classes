class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :website, :course_for, :show_url, :image_urls, :short_description, :duration, :no_of_lessons,
             :level, :lecture_count, :original_price, :discounted_price, :reviews_count, :body_html, :course_highlights_html
  has_many :chapters
  has_one :teacher
  has_one :category
  has_many :enrolled_users
  has_many :reviews
  has_many :conversations do
  	object.conversations.groups
  end

  def body_html
    object.body.body
  end

  def course_highlights_html
    object.course_highlights.body
  end

  def	original_price
    object.price
  end

  def reviews_count
    object.reviews.count
  end

  def	discounted_price
    original_price - original_price * object.discount_percentage/100.0
  end
end
