class AssignmentSerializer < ApplicationSerializer
  attributes :id, :question, :instructions_html, :points, :due_date
  has_one :chapter

  def instructions_html
    object.instructions.body
  end
end
