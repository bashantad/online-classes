class EnrollRequest < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :course
  validates :email, presence: true
end
