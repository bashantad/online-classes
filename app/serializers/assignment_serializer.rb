class AssignmentSerializer < ApplicationSerializer
  attributes :id, :question, :points, :due_date
  attribute :instructions_html, if: :enrolled_course_user?
  has_one :chapter

  def instructions_html
    object.instructions.body
  end
end
