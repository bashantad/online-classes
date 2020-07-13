class Teaching::CourseContentSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :duration
  has_one :course
end
