class ChapterSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :course_contents
end
