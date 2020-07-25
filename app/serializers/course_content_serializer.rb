class CourseContentSerializer < ActiveModel::Serializer
  attributes :id, :title, :description_html, :duration, :preview
  has_one :course

  def description_html
    object.description.body
  end
end
