class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :question, :instructions, :points, :due_date
  has_one :chapter
end
