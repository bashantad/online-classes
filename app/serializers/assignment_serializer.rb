class AssignmentSerializer < ApplicationSerializer
  attributes :id, :question, :points, :due_date_str
  attribute :instructions_html, if: :enrolled_course_user?
  has_one :chapter

  def instructions_html
    object.instructions.body
  end

  def due_date_str
  	object.due_date.to_s(:short)
  end
end
