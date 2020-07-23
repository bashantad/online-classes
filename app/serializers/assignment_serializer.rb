class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :question, :instructions, :points, :due
  has_one :chapter
end
