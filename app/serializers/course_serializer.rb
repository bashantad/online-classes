class CourseSerializer < ApplicationSerializer
  attributes :id, :title, :website, :course_for, :show_url, :image_urls, :short_description, :duration, :no_of_lessons,
             :level, :lecture_count, :original_price, :discounted_price, :reviews_count, :body_html, :course_highlights_html,
             :calling_url, :message_link
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

  def calling_url
    return if object.calls.empty?
    object.calls.first.calling_url
  end

  def message_link
    conversation = object.general_conversation
    {
        title: conversation.title,
        url: conversation.message_url
    }
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
