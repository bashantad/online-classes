class CourseContentSerializer < ApplicationSerializer
  attributes :id, :title, :duration, :preview
  attribute :description_html, if: :enrolled_course_user?
  has_one :course

  def description_html
    object.description.body
  end
end
