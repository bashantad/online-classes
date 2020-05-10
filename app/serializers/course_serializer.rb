class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :body, :website, :course_for, :price
  has_one :owner
  has_one :category
  has_many :enrolled_users
  has_many :conversations do
  	object.conversations.groups
  end
end
