class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :body, :website, :course_for, :price
  has_one :user
  has_one :category
end
