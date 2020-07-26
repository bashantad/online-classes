class AssignmentSubmissionSerializer < ApplicationSerializer
  attributes :id, :description_html, :submission_date
  has_one :user
  has_one :assignment

  def description_html
    object.description.body
  end
end
