class AssignmentSubmission < ApplicationRecord
  belongs_to :user
  belongs_to :assignment
  has_rich_text :description

  def submitted?
    submission_date.present?
  end
end
