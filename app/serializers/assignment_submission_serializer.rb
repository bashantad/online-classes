class AssignmentSubmissionSerializer < ApplicationSerializer
  attributes :id, :description, :submission_date
  has_one :user
  has_one :assignment
end
