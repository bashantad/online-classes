class Teaching::CourseContentSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :duration, :preview
  has_one :course
end
